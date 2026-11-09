import React from 'react';
import { abs, jsonLd, SITE, type PageSeo } from './seo';
import { projects, type Project } from './constants/projects';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Keeps <head> in sync with the current route after client-side navigation. */
export const useSeo = (page: PageSeo | null, project?: Project) => {
  React.useEffect(() => {
    if (!page) return;
    const url = abs(page.path);
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:type', page.ogType);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:image', abs(page.image));
    setMeta('property', 'og:image:alt', page.imageAlt);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', abs(page.image));

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let ld = document.getElementById('ld-json');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'ld-json';
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd(page, projects, project));
  }, [page?.path, page?.title]);
};

export { SITE };
