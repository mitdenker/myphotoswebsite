import type { Project } from './constants/projects';

/**
 * Single source of truth for page metadata.
 * Used by the client (useSeo hook) and by scripts/seo.mjs at build time,
 * which writes static HTML per route plus sitemap.xml and llms.txt.
 */
export const SITE = {
  url: 'https://whirlfull.com',
  name: 'Elena Korotkova Photography',
  person: 'Elena Korotkova',
  email: 'korotko.elena@gmail.com',
  instagram: 'https://www.instagram.com/whirlfull/',
  city: 'Lisbon',
  country: 'PT',
  locale: 'en_US',
  lang: 'en',
  portrait: '/elena.webp',
  themeColor: '#f9f9f7',
};

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ogType: 'website' | 'profile' | 'article';
}

export const homeSeo = (projects: Project[]): PageSeo => ({
  path: '/',
  title: 'Elena Korotkova — Portrait Photographer in Lisbon',
  description:
    'Portrait photographer based in Lisbon, originally from Saint Petersburg. Expressive, vivid portraits made with light, shadow and smoke — ' +
    `${projects.length} portrait series to browse.`,
  image: projects[0]?.image ?? SITE.portrait,
  imageAlt: projects[0] ? `${projects[0].title} — portrait by ${SITE.person}` : SITE.person,
  ogType: 'website',
});

export const contactsSeo = (): PageSeo => ({
  path: '/contacts',
  title: 'Contacts & Bookings — Elena Korotkova, Lisbon Photographer',
  description:
    'Book a portrait shoot with Elena Korotkova, a photographer based in Lisbon. Write by email or Instagram (@whirlfull) for portrait sessions, film sessions and collaborations.',
  image: SITE.portrait,
  imageAlt: `${SITE.person}, photographer`,
  ogType: 'profile',
});

export const projectSeo = (project: Project): PageSeo => {
  const count = project.gallery.length;
  return {
    path: `/work/${project.id}`,
    title: `${project.title} — ${project.category} Series by Elena Korotkova`,
    description:
      project.description ||
      `${project.title}: a ${project.category.toLowerCase()} series of ${count} photographs (${project.year}) by Elena Korotkova, a portrait photographer based in Lisbon.`,
    image: project.image,
    imageAlt: `${project.title} — ${project.category.toLowerCase()} by ${SITE.person}`,
    ogType: 'article',
  };
};

const personNode = () => ({
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.person,
  jobTitle: 'Photographer',
  description: 'Portrait photographer based in Lisbon, originally from Saint Petersburg.',
  url: `${SITE.url}/`,
  email: `mailto:${SITE.email}`,
  image: abs(SITE.portrait),
  sameAs: [SITE.instagram],
  workLocation: { '@type': 'Place', name: 'Lisbon, Portugal' },
  knowsAbout: ['Portrait photography', 'Film photography'],
});

const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': `${SITE.url}/#person` },
});

export const jsonLd = (page: PageSeo, projects: Project[], project?: Project) => {
  const url = abs(page.path);
  const graph: Record<string, unknown>[] = [personNode(), websiteNode()];

  if (project) {
    graph.push({
      '@type': 'ImageGallery',
      '@id': `${url}#gallery`,
      url,
      name: project.title,
      headline: page.title,
      description: page.description,
      inLanguage: SITE.lang,
      isPartOf: { '@id': `${SITE.url}/#website` },
      author: { '@id': `${SITE.url}/#person` },
      creator: { '@id': `${SITE.url}/#person` },
      dateCreated: project.year,
      genre: `${project.category} photography`,
      primaryImageOfPage: { '@type': 'ImageObject', contentUrl: abs(project.hero) },
      image: project.gallery.map((src, i) => ({
        '@type': 'ImageObject',
        contentUrl: abs(src),
        name: `${project.title}, figure ${String(i + 1).padStart(2, '0')}`,
        creator: { '@id': `${SITE.url}/#person` },
        creditText: SITE.person,
        copyrightNotice: `© ${SITE.person}`,
      })),
    });
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Work', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: project.title, item: url },
      ],
    });
  } else if (page.path === '/contacts') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: SITE.lang,
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#person` },
      mainEntity: { '@id': `${SITE.url}/#person` },
    });
  } else {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: SITE.lang,
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#person` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.title,
          url: abs(`/work/${p.id}`),
        })),
      },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};
