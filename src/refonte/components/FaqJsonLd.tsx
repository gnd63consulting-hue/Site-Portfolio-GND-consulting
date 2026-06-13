/* FaqJsonLd — injecte un balisage Schema.org FAQPage (JSON-LD) à partir
 * d'une liste question/réponse en TEXTE BRUT. À placer sur une page qui
 * affiche déjà visiblement ces mêmes questions/réponses (règle Google :
 * le contenu balisé doit correspondre au contenu visible).
 * Rend les pages éligibles aux résultats enrichis Google ET facilite la
 * citation par ChatGPT / Perplexity / AI Overviews. 100 % <head>, invisible. */
import * as React from 'react';

export type FaqItem = { q: string; a: string };

export function FaqJsonLd({ id, items }: { id: string; items: FaqItem[] }) {
  React.useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    };
    const scriptId = `gnd-faq-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => { el?.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return null;
}
