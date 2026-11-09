export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location?: string; // defaults to Lisbon
  description: string;
  hero: string;
  heroOrientation: 'landscape' | 'portrait';
  image: string; // Preview image
  gallery: string[];
  nextId: string;
  size?: string; // For masonry grid
}

const marinaCover = '/photos/marina/f76ed92f-51de-4874-bbd7-c4d08d0d74f4-2/preview.webp';
const marinaHero = '/photos/marina/f76ed92f-51de-4874-bbd7-c4d08d0d74f4-2/large.webp';
const marinaGallery: string[] = [
  '/photos/marina/0c4901ba-d485-4393-ba7c-84d741ce2c31-2/preview.webp',
  '/photos/marina/0d7406f0-7563-421c-bac5-2d20f440ec5f-2/preview.webp',
  '/photos/marina/0f9174b8-5bfd-4420-aba5-0816f84e7d92-2/preview.webp',
  '/photos/marina/2b8b0a98-5eff-4031-950c-3adfd88d93f5-2/preview.webp',
  '/photos/marina/4cdae7e2-ec08-4d52-b2da-0d993f288076-2/preview.webp',
  '/photos/marina/4db051f6-6d50-4302-b16b-28399a97abfe-2/preview.webp',
  '/photos/marina/5c20c36f-2f3c-435b-b121-273d77a47035-2/preview.webp',
  '/photos/marina/2130b6da-1051-4000-9809-23d2781654bc-2/preview.webp',
  '/photos/marina/6545a2b8-4a00-4b84-9733-ec733ee7e3bf-2/preview.webp',
  '/photos/marina/8717e5c7-03c6-4da8-bcb1-f2a7c8ca5165-2/preview.webp',
  '/photos/marina/054222e8-81d0-4c27-971a-c9ea481eb1b0-2/preview.webp',
  '/photos/marina/82667299-c1ac-48f6-b966-639667d782b9-2/preview.webp',
  '/photos/marina/afc15feb-5304-4a7c-9e45-f271642c3c53-2/preview.webp',
  '/photos/marina/b3c6634c-2ab8-4591-90e7-4515f3b4f8e8-2/preview.webp',
  '/photos/marina/b0980150-45dc-414f-8b3d-bb932365a675-2/preview.webp',
  '/photos/marina/bbc9f447-f9cb-4a9f-9fb5-e01693603860-2/preview.webp',
  '/photos/marina/bc8a9d5d-d483-4a1f-b354-8f5a5eb5b8ba-2/preview.webp',
  '/photos/marina/e810b81e-fdc2-4d34-8394-9baec375578c/preview.webp',
  marinaCover,
];

const chenxi2Cover = '/photos/chenxi2/4594a382-4697-4a7a-a87f-553d2ea507c2/preview.webp';
const chenxi2Hero = '/photos/chenxi2/4594a382-4697-4a7a-a87f-553d2ea507c2/large.webp';
const chenxi2Gallery: string[] = [
  '/photos/chenxi2/9b6ee107-e0bf-492f-b2b6-426200dd8a26/preview.webp',
  '/photos/chenxi2/480a1775/preview.webp',
  '/photos/chenxi2/480a1802/preview.webp',
  '/photos/chenxi2/480a1981/preview.webp',
  '/photos/chenxi2/480a2105/preview.webp',
  '/photos/chenxi2/587e5891-4896-4adf-95ae-abbd59ed380f/preview.webp',
  chenxi2Cover,
  '/photos/chenxi2/425632fc-c46e-4928-a61f-704ec287a5c6/preview.webp',
  '/photos/chenxi2/641355b6-d22f-4664-8c8c-7cd715f6314b/preview.webp',
  '/photos/chenxi2/3087369c-46f0-4cbf-bb01-efcfa3d7cea5/preview.webp',
  '/photos/chenxi2/35173409-1732-49f7-a2bc-ee4c83ed10b7/preview.webp',
  '/photos/chenxi2/88596604-e17e-48bb-a608-31d22c407cf6/preview.webp',
  '/photos/chenxi2/a6370aa4-bc7e-485f-bfbc-588ee9f2ebc0/preview.webp',
  '/photos/chenxi2/c98c1ddf-0798-4645-9c1a-933fdf6878a8/preview.webp',
  '/photos/chenxi2/e5cd9156-4b1a-4cfa-9dbe-c7adb1c1bee4/preview.webp',
  '/photos/chenxi2/fbb7ccff-fc27-4be2-9166-8af9120e357d/preview.webp',
];

const chenxiCover = '/photos/chenxi/5bdca161-bdeb-4f95-bb37-dee94054d358/preview.webp';
const chenxiHero = '/photos/chenxi/5bdca161-bdeb-4f95-bb37-dee94054d358/large.webp';
const chenxiGallery: string[] = [
  '/photos/chenxi/1/preview.webp',
  '/photos/chenxi/2ab1cce9-4cec-46d8-8b02-510d721e3228/preview.webp',
  '/photos/chenxi/02e7ddf2-1754-45e3-be39-85a23cdb755d/preview.webp',
  '/photos/chenxi/4/preview.webp',
  chenxiCover,
  '/photos/chenxi/6a436a88-9f62-4af6-b40b-2dea5e2934ca/preview.webp',
  '/photos/chenxi/7b5124bf-110a-4534-bcc1-49e690327e36/preview.webp',
  '/photos/chenxi/99/preview.webp',
  '/photos/chenxi/0521c857-00aa-4b16-996f-c5bd84446678/preview.webp',
  '/photos/chenxi/523c0d0e-2ba3-4ee0-a068-b59fe2c0be63/preview.webp',
  '/photos/chenxi/63995c33-7ee6-47ac-aacb-f49ce7a40f42/preview.webp',
  '/photos/chenxi/c105c9da-2d4b-45ca-a320-1094f0377d4d/preview.webp',
  '/photos/chenxi/e0113807-e91c-41ee-8577-6c92823f50e2/preview.webp',
  '/photos/chenxi/fa449055-5086-43fa-ae01-ada1a9ea8a54/preview.webp',
  '/photos/chenxi/img-2109/preview.webp',
  '/photos/chenxi/img-2113/preview.webp',
  '/photos/chenxi/img-2114/preview.webp',
  '/photos/chenxi/img-2157/preview.webp',
  '/photos/chenxi/img-2158/preview.webp',
];

const lenaCover = '/photos/lena/img-1613/preview.webp';
const lenaHero = '/photos/lena/img-1613/large.webp';
const lenaGallery: string[] = [
  lenaCover,
  '/photos/lena/img-1577/preview.webp',
  '/photos/lena/img-1561/preview.webp',
  '/photos/lena/img-1614/preview.webp',
  '/photos/lena/img-1705-1/preview.webp',
  '/photos/lena/img-1708-1/preview.webp',
  '/photos/lena/img-1715-1/preview.webp',
  '/photos/lena/img-1718-1/preview.webp',
  '/photos/lena/img-1722-1/preview.webp',
  '/photos/lena/img-1725-1/preview.webp',
  '/photos/lena/photo-2026-04-26-18-07-49/preview.webp',
  '/photos/lena/photo-2026-04-26-18-07-51/preview.webp',
  '/photos/lena/photo-2026-04-26-18-07-52/preview.webp',
  '/photos/lena/photo-2026-04-26-18-07-54/preview.webp',
];

const lena2Cover = '/photos/lena2/img-1740/preview.webp';
const lena2Hero = '/photos/lena2/img-1740/large.webp';
const lena2Gallery: string[] = [
  lena2Cover,
  '/photos/lena2/img-2496/preview.webp',
  '/photos/lena2/img-2596-1/preview.webp',
  '/photos/lena2/img-2597/preview.webp',
  '/photos/lena2/img-2627-1/preview.webp',
  '/photos/lena2/img-2631/preview.webp',
  '/photos/lena2/img-2639/preview.webp',
  '/photos/lena2/img-2653/preview.webp',
  '/photos/lena2/img-2656/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-12-31/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-12-34/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-12-36/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-12-45/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-12-50/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-13-23/preview.webp',
  '/photos/lena2/img-2651-1/preview.webp',
  '/photos/lena2/photo-2026-04-26-18-13-34/preview.webp',
];

const jennyCover = '/photos/jenny/5e5b82cd-ad6a-46de-9f9f-8689ab41a81a/preview.webp';
const jennyHero = '/photos/jenny/5e5b82cd-ad6a-46de-9f9f-8689ab41a81a/large.webp';
const jennyGallery: string[] = [
  jennyCover,
  '/photos/jenny/480a3664/preview.webp',
  '/photos/jenny/480a3679/preview.webp',
  '/photos/jenny/480a4220/preview.webp',
  '/photos/jenny/480a4239/preview.webp',
  '/photos/jenny/480a4294/preview.webp',
  '/photos/jenny/480a4311/preview.webp',
  '/photos/jenny/480a4420/preview.webp',
  '/photos/jenny/480a4447/preview.webp',
  '/photos/jenny/5011f131-e49c-432b-9f1c-07c6bd876ea2/preview.webp',
  '/photos/jenny/a6b53664-2ba3-4a02-ae33-4d23fe0c32b2/preview.webp',
  '/photos/jenny/fa3b5345-2156-4e54-8285-fa14088d9f8e/preview.webp',
];

const sorayaCover = '/photos/soraya/5635879c-2ed2-4bb3-bdc1-2d4925f7b5de-bw/preview.webp';
const sorayaHero = '/photos/soraya/5635879c-2ed2-4bb3-bdc1-2d4925f7b5de-bw/large.webp';
const sorayaGallery: string[] = [
  '/photos/soraya/9ff2790c-6a1f-4961-aaf5-498c3325a035/preview.webp',
  '/photos/soraya/480a9136/preview.webp',
  '/photos/soraya/480a8967/preview.webp',
  '/photos/soraya/fab1d23b-1ef8-414c-9f1b-1b327f61dc85/preview.webp',
  '/photos/soraya/6f737748-e41b-47ff-9f02-a623f7b2ec0c/preview.webp',
  '/photos/soraya/334a18a5-ed25-4b6f-b5af-1d9992519865/preview.webp',
  '/photos/soraya/0ba707bc-be0b-4e53-9e43-e829ef8a53b8/preview.webp',
  '/photos/soraya/img6261/preview.webp',
  '/photos/soraya/480a1017/preview.webp',
  '/photos/soraya/480a0640/preview.webp',
  '/photos/soraya/5635879c-2ed2-4bb3-bdc1-2d4925f7b5de-bw/preview.webp',
  '/photos/soraya/480a0929/preview.webp',
  '/photos/soraya/3a94f0cb-5129-4c82-b5c0-5a287c85f093/preview.webp',
  '/photos/soraya/abf04fd6-3da4-44f8-8015-3608ec5130e0/preview.webp',
  '/photos/soraya/cbb3d5a7-891e-4db0-adb4-5efdd17f1f14/preview.webp',
  '/photos/soraya/d745db2f-9984-4550-ac3d-90df8ebc901b/preview.webp',
];

const romaCover = '/photos/roma/roma-14/preview.webp';
const romaHero = '/photos/roma/roma-14/large.webp';
const romaGallery: string[] = [
  '/photos/roma/roma-01/preview.webp',
  '/photos/roma/roma-02/preview.webp',
  '/photos/roma/roma-03/preview.webp',
  '/photos/roma/roma-04/preview.webp',
  '/photos/roma/roma-05/preview.webp',
  '/photos/roma/roma-06/preview.webp',
  '/photos/roma/roma-07/preview.webp',
  '/photos/roma/roma-09/preview.webp',
  '/photos/roma/roma-11/preview.webp',
  '/photos/roma/roma-12/preview.webp',
  '/photos/roma/roma-13/preview.webp',
  '/photos/roma/roma-14/preview.webp',
  '/photos/roma/roma-15/preview.webp',
  '/photos/roma/roma-16/preview.webp',
];

const halloweenCover = '/photos/halloween/halloween-11/preview.webp';
const halloweenHero = '/photos/halloween/halloween-11/large.webp';
const halloweenGallery: string[] = [
  '/photos/halloween/halloween-01/preview.webp',
  '/photos/halloween/halloween-02/preview.webp',
  '/photos/halloween/halloween-03/preview.webp',
  '/photos/halloween/halloween-04/preview.webp',
  '/photos/halloween/halloween-05/preview.webp',
  '/photos/halloween/halloween-06/preview.webp',
  '/photos/halloween/halloween-07/preview.webp',
  '/photos/halloween/halloween-08/preview.webp',
  '/photos/halloween/halloween-09/preview.webp',
  '/photos/halloween/halloween-10/preview.webp',
  '/photos/halloween/halloween-11/preview.webp',
  '/photos/halloween/halloween-12/preview.webp',
  '/photos/halloween/halloween-13/preview.webp',
];

const bernardoCover = '/photos/bernardo/bernardo-01/preview.webp';
const bernardoHero = '/photos/bernardo/bernardo-01/large.webp';
const bernardoGallery: string[] = [
  '/photos/bernardo/bernardo-01/preview.webp',
  '/photos/bernardo/bernardo-02/preview.webp',
  '/photos/bernardo/bernardo-03/preview.webp',
  '/photos/bernardo/bernardo-04/preview.webp',
  '/photos/bernardo/bernardo-05/preview.webp',
  '/photos/bernardo/bernardo-06/preview.webp',
  '/photos/bernardo/bernardo-07/preview.webp',
  '/photos/bernardo/bernardo-08/preview.webp',
  '/photos/bernardo/bernardo-09/preview.webp',
  '/photos/bernardo/bernardo-10/preview.webp',
  '/photos/bernardo/bernardo-11/preview.webp',
  '/photos/bernardo/bernardo-12/preview.webp',
];

const serejaCover = '/photos/sereja/sereja-09/preview.webp';
const serejaHero = '/photos/sereja/sereja-09/large.webp';
const serejaGallery: string[] = [
  '/photos/sereja/sereja-01/preview.webp',
  '/photos/sereja/sereja-02/preview.webp',
  '/photos/sereja/sereja-03/preview.webp',
  '/photos/sereja/sereja-04/preview.webp',
  '/photos/sereja/sereja-05/preview.webp',
  '/photos/sereja/sereja-06/preview.webp',
  '/photos/sereja/sereja-07/preview.webp',
  '/photos/sereja/sereja-08/preview.webp',
  '/photos/sereja/sereja-09/preview.webp',
  '/photos/sereja/sereja-10/preview.webp',
  '/photos/sereja/sereja-11/preview.webp',
  '/photos/sereja/sereja-12/preview.webp',
];

const olgaCover = '/photos/olga/olga-01/preview.webp';
const olgaHero = '/photos/olga/olga-01/large.webp';
const olgaGallery: string[] = [
  '/photos/olga/olga-01/preview.webp',
  '/photos/olga/olga-02/preview.webp',
  '/photos/olga/olga-03/preview.webp',
  '/photos/olga/olga-04/preview.webp',
  '/photos/olga/olga-06/preview.webp',
  '/photos/olga/olga-07/preview.webp',
  '/photos/olga/olga-08/preview.webp',
  '/photos/olga/olga-09/preview.webp',
  '/photos/olga/olga-11/preview.webp',
  '/photos/olga/olga-12/preview.webp',
  '/photos/olga/olga-13/preview.webp',
  '/photos/olga/olga-14/preview.webp',
  '/photos/olga/olga-15/preview.webp',
  '/photos/olga/olga-16/preview.webp',
  '/photos/olga/olga-17/preview.webp',
  '/photos/olga/olga-18/preview.webp',
];

const leraCover = '/photos/lera/lera-01/preview.webp';
const leraHero = '/photos/lera/lera-01/large.webp';
const leraGallery: string[] = [
  '/photos/lera/lera-01/preview.webp',
  '/photos/lera/lera-02/preview.webp',
  '/photos/lera/lera-03/preview.webp',
  '/photos/lera/lera-04/preview.webp',
  '/photos/lera/lera-05/preview.webp',
  '/photos/lera/lera-06/preview.webp',
  '/photos/lera/lera-07/preview.webp',
  '/photos/lera/lera-08/preview.webp',
  '/photos/lera/lera-09/preview.webp',
  '/photos/lera/lera-10/preview.webp',
  '/photos/lera/lera-11/preview.webp',
  '/photos/lera/lera-12/preview.webp',
  '/photos/lera/lera-19/preview.webp',
  '/photos/lera/lera-13/preview.webp',
  '/photos/lera/lera-14/preview.webp',
  '/photos/lera/lera-15/preview.webp',
  '/photos/lera/lera-16/preview.webp',
  '/photos/lera/lera-17/preview.webp',
  '/photos/lera/lera-18/preview.webp',
];

const schmithCover = '/photos/schmith/schmith-01/preview.webp';
const schmithHero = '/photos/schmith/schmith-01/large.webp';
const schmithGallery: string[] = [
  '/photos/schmith/schmith-01/preview.webp',
  '/photos/schmith/schmith-02/preview.webp',
  '/photos/schmith/schmith-03/preview.webp',
  '/photos/schmith/schmith-04/preview.webp',
  '/photos/schmith/schmith-05/preview.webp',
  '/photos/schmith/schmith-06/preview.webp',
  '/photos/schmith/schmith-07/preview.webp',
  '/photos/schmith/schmith-08/preview.webp',
  '/photos/schmith/schmith-09/preview.webp',
  '/photos/schmith/schmith-10/preview.webp',
  '/photos/schmith/schmith-11/preview.webp',
  '/photos/schmith/schmith-12/preview.webp',
  '/photos/schmith/schmith-13/preview.webp',
  '/photos/schmith/schmith-14/preview.webp',
  '/photos/schmith/schmith-15/preview.webp',
  '/photos/schmith/schmith-16/preview.webp',
  '/photos/schmith/schmith-17/preview.webp',
];

const bergheinCover = '/photos/berghein/berghein-14/preview.webp';
const bergheinHero = '/photos/berghein/berghein-14/large.webp';
const bergheinGallery: string[] = [
  '/photos/berghein/berghein-02/preview.webp',
  '/photos/berghein/berghein-03/preview.webp',
  '/photos/berghein/berghein-04/preview.webp',
  '/photos/berghein/berghein-05/preview.webp',
  '/photos/berghein/berghein-06/preview.webp',
  '/photos/berghein/berghein-07/preview.webp',
  '/photos/berghein/berghein-11/preview.webp',
  '/photos/berghein/berghein-12/preview.webp',
  '/photos/berghein/berghein-14/preview.webp',
  '/photos/berghein/berghein-15/preview.webp',
  '/photos/berghein/berghein-16/preview.webp',
  '/photos/berghein/berghein-17/preview.webp',
  '/photos/berghein/berghein-18/preview.webp',
];

const mishaCover = '/photos/misha/misha-01/preview.webp';
const mishaHero = '/photos/misha/misha-01/large.webp';
const mishaGallery: string[] = [
  '/photos/misha/misha-01/preview.webp',
  '/photos/misha/misha-02/preview.webp',
  '/photos/misha/misha-03/preview.webp',
  '/photos/misha/misha-04/preview.webp',
  '/photos/misha/misha-05/preview.webp',
  '/photos/misha/misha-06/preview.webp',
  '/photos/misha/misha-07/preview.webp',
  '/photos/misha/misha-08/preview.webp',
  '/photos/misha/misha-09/preview.webp',
];

export const projects: Project[] = [
  {
    id: 'chenxi',
    title: 'Chenxi',
    category: 'Portrait',
    year: '2026',
    description: '',
    hero: chenxiHero,
    heroOrientation: 'portrait',
    image: chenxiCover,
    gallery: chenxiGallery,
    nextId: 'lera'
  },
  {
    id: 'lera', title: 'Lera', category: 'Portrait', year: '2026', description: '',
    hero: leraHero, heroOrientation: 'portrait', image: leraCover, gallery: leraGallery, nextId: 'roma'
  },
  {
    id: 'roma',
    title: 'Roma',
    category: 'Portrait',
    year: '2026',
    description: '',
    hero: romaHero,
    heroOrientation: 'portrait',
    image: romaCover,
    gallery: romaGallery,
    nextId: 'halloween'
  },
  {
    id: 'halloween',
    title: 'Halloween',
    category: 'Portrait',
    year: '2026',
    description: '',
    hero: halloweenHero,
    heroOrientation: 'portrait',
    image: halloweenCover,
    gallery: halloweenGallery,
    nextId: 'chenxi2'
  },
  {
    id: 'chenxi2',
    title: 'Chenxi 2',
    category: 'Portrait',
    year: '2026',
    description: '',
    hero: chenxi2Hero,
    heroOrientation: 'portrait',
    image: chenxi2Cover,
    gallery: chenxi2Gallery,
    nextId: 'sereja'
  },
  {
    id: 'sereja', title: 'Sereja', category: 'Portrait', year: '2026', description: '',
    hero: serejaHero, heroOrientation: 'portrait', image: serejaCover, gallery: serejaGallery, nextId: 'soraya'
  },
  {
    id: 'soraya',
    title: 'Soraya',
    category: 'Portrait',
    year: '2026',
    description: '',
    hero: sorayaHero,
    heroOrientation: 'portrait',
    image: sorayaCover,
    gallery: sorayaGallery,
    nextId: 'marina'
  },
  {
    id: 'marina',
    title: 'Marina',
    category: 'Portrait',
    year: '2025',
    description: '',
    hero: marinaHero,
    heroOrientation: 'portrait',
    image: marinaCover,
    gallery: marinaGallery,
    nextId: 'bernardo'
  },
  {
    id: 'bernardo', title: 'Bernardo', category: 'Portrait', year: '2026', description: '',
    hero: bernardoHero, heroOrientation: 'portrait', image: bernardoCover, gallery: bernardoGallery, nextId: 'olga'
  },
  {
    id: 'olga', title: 'Olga', category: 'Portrait', year: '2026', description: '',
    hero: olgaHero, heroOrientation: 'portrait', image: olgaCover, gallery: olgaGallery, nextId: 'schmith'
  },
  {
    id: 'schmith', title: 'Schmith', category: 'Portrait', year: '2026', description: '',
    hero: schmithHero, heroOrientation: 'portrait', image: schmithCover, gallery: schmithGallery, nextId: 'berghein'
  },
  {
    id: 'berghein', title: 'Olya', category: 'Portrait', year: '2026', location: 'Berlin', description: '',
    hero: bergheinHero, heroOrientation: 'portrait', image: bergheinCover, gallery: bergheinGallery, nextId: 'misha'
  },
  {
    id: 'misha', title: 'Misha', category: 'Portrait', year: '2026', description: '',
    hero: mishaHero, heroOrientation: 'portrait', image: mishaCover, gallery: mishaGallery, nextId: 'lena'
  },
  {
    id: 'lena',
    title: 'Lena',
    category: 'Portrait',
    year: '2025',
    description: '',
    hero: lenaHero,
    heroOrientation: 'landscape',
    image: lenaCover,
    gallery: lenaGallery,
    nextId: 'lena2'
  },
  {
    id: 'lena2',
    title: 'Lena 2',
    category: 'Portrait',
    year: '2025',
    description: '',
    hero: lena2Hero,
    heroOrientation: 'landscape',
    image: lena2Cover,
    gallery: lena2Gallery,
    nextId: 'jenny'
  },
  {
    id: 'jenny',
    title: 'Jenny',
    category: 'Portrait',
    year: '2026',
    location: 'Berlin',
    description: '',
    hero: jennyHero,
    heroOrientation: 'portrait',
    image: jennyCover,
    gallery: jennyGallery,
    nextId: 'chenxi'
  }
];
