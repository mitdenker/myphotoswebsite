import { execFile } from 'node:child_process';
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const SOURCE_DIR = process.argv[2] ?? 'photos/Marina';
const OUTPUT_DIR = process.argv[3] ?? 'cdn-ready/photos/marina';
const PROJECT_NAME = process.argv[4] ?? 'Marina';
const BASE_PATH = path.posix.join('photos', slugify(PROJECT_NAME));

const VARIANTS = [
  { name: 'placeholder', maxEdge: 48, quality: 35 },
  { name: 'thumb', maxEdge: 640, quality: 76 },
  { name: 'preview', maxEdge: 1600, quality: 80 },
  { name: 'large', maxEdge: 2560, quality: 84 },
];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp']);

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'photo';
}

function toPosix(...parts) {
  return parts.join('/').replace(/\/+/g, '/');
}

function variantDimensions(width, height, maxEdge) {
  const ratio = Math.min(1, maxEdge / Math.max(width, height));
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

async function imageDimensions(filePath) {
  const { stdout } = await execFileAsync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', filePath]);
  const width = Number(stdout.match(/pixelWidth:\s+(\d+)/)?.[1]);
  const height = Number(stdout.match(/pixelHeight:\s+(\d+)/)?.[1]);

  if (!width || !height) {
    throw new Error(`Could not read dimensions for ${filePath}`);
  }

  return { width, height };
}

async function encodeWebp(inputPath, outputPath, width, height, variant) {
  const target = variantDimensions(width, height, variant.maxEdge);
  const resizeArgs = width >= height
    ? ['-resize', String(target.width), '0']
    : ['-resize', '0', String(target.height)];

  await execFileAsync('cwebp', [
    '-quiet',
    '-q', String(variant.quality),
    '-m', '6',
    '-mt',
    '-sharp_yuv',
    '-metadata', 'none',
    ...resizeArgs,
    inputPath,
    '-o', outputPath,
  ]);

  const outputStats = await stat(outputPath);

  return {
    path: toPosix(BASE_PATH, path.basename(path.dirname(outputPath)), path.basename(outputPath)),
    width: target.width,
    height: target.height,
    bytes: outputStats.size,
  };
}

async function main() {
  const sourceDir = path.resolve(SOURCE_DIR);
  const outputDir = path.resolve(OUTPUT_DIR);
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const sources = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (sources.length === 0) {
    throw new Error(`No supported image files found in ${sourceDir}`);
  }

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const usedIds = new Map();
  const photos = [];

  for (const [index, fileName] of sources.entries()) {
    const inputPath = path.join(sourceDir, fileName);
    const baseId = slugify(path.basename(fileName, path.extname(fileName)));
    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);
    const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;
    const photoDir = path.join(outputDir, id);
    const originalExtension = path.extname(fileName).toLowerCase() === '.jpeg'
      ? '.jpg'
      : path.extname(fileName).toLowerCase();
    const originalPath = path.join(photoDir, `original${originalExtension}`);

    await mkdir(photoDir, { recursive: true });

    const { width, height } = await imageDimensions(inputPath);
    await copyFile(inputPath, originalPath);

    const variantFiles = {};

    for (const variant of VARIANTS) {
      variantFiles[variant.name] = await encodeWebp(
        inputPath,
        path.join(photoDir, `${variant.name}.webp`),
        width,
        height,
        variant,
      );
    }

    const originalStats = await stat(originalPath);
    const originalManifestPath = toPosix(BASE_PATH, id, path.basename(originalPath));

    photos.push({
      id,
      project: PROJECT_NAME,
      alt: `${PROJECT_NAME} photo ${String(index + 1).padStart(2, '0')}`,
      originalName: fileName,
      width,
      height,
      aspectRatio: Number((width / height).toFixed(6)),
      placeholder: variantFiles.placeholder,
      thumb: variantFiles.thumb,
      preview: variantFiles.preview,
      large: variantFiles.large,
      original: {
        path: originalManifestPath,
        width,
        height,
        bytes: originalStats.size,
      },
    });

    console.log(`Processed ${index + 1}/${sources.length}: ${fileName}`);
  }

  const manifest = {
    project: PROJECT_NAME,
    sourceDir: path.relative(process.cwd(), sourceDir),
    outputDir: path.relative(process.cwd(), outputDir),
    basePath: BASE_PATH,
    generatedAt: new Date().toISOString(),
    variantPolicy: {
      placeholder: '48px max edge WebP for blur-up placeholders',
      thumb: '640px max edge WebP for grids',
      preview: '1600px max edge WebP for detail pages',
      large: '2560px max edge WebP for lightboxes',
      original: 'Untouched source file for explicit full-resolution views or downloads',
    },
    uploadHint: `Sync ${path.relative(process.cwd(), outputDir)} to your bucket under ${BASE_PATH}/`,
    count: photos.length,
    photos,
  };

  const manifestPath = path.join(outputDir, 'manifest.json');
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log('');
  console.log(`Done. Wrote ${photos.length} photos to ${path.relative(process.cwd(), outputDir)}`);
  console.log(`Manifest: ${path.relative(process.cwd(), manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
