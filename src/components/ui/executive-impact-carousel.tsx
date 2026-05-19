"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  prodImg: string;
  modelImg: string;
}

/* GND Consulting — vrais projets du portfolio (miniatures YouTube, légères & vérifiées 200,
   ~12–116 Ko vs photos Supabase 6,7 Mo qui plombaient le scroll). Le champ `price` du
   composant est réutilisé pour la discipline (contexte studio créatif, pas e-commerce).
   prodImg/modelImg = 2 visuels réels distincts → l'effet de survol reste exact. */
const YT = (id: string, q = "maxresdefault") => `https://img.youtube.com/vi/${id}/${q}.jpg`;
const A = YT("6oaO6YoWjyQ");          // Esther Seems — BOBINE
const B = YT("UbXQim7iNLI");          // Leyel — Miel
const C = YT("galhl8_dYyk");          // Cook & Soul
const D = YT("Vyhz7_D4fFU", "hqdefault"); // Sabay Festival
/* 4 projets dont chacun a sa propre miniature légère vérifiée → le titre correspond
   toujours à son visuel. modelImg (survol) = un AUTRE vrai projet GND. Répété sur 15
   cartes, exactement comme le composant d'origine répète ses items. */
const SOURCE = [
  { title: "Esther Seems — BOBINE", price: "Clip musical · 2024", prodImg: A, modelImg: C },
  { title: "Leyel — Miel", price: "Clip musical · 2025", prodImg: B, modelImg: A },
  { title: "Cook & Soul", price: "Production · 2024", prodImg: C, modelImg: B },
  { title: "Sabay Festival", price: "Événementiel · 4K", prodImg: D, modelImg: A },
];

const PRODUCTS: Product[] = Array.from({ length: 15 }, (_, i) => {
  const p = SOURCE[i % SOURCE.length];
  return { id: String(i + 1), title: p.title, price: p.price, prodImg: p.prodImg, modelImg: p.modelImg };
});

// Split products into 3 chunks for the 3 columns
const COL_1_PRODUCTS = PRODUCTS.slice(0, 5);
const COL_2_PRODUCTS = PRODUCTS.slice(5, 10);
const COL_3_PRODUCTS = PRODUCTS.slice(10, 15);

// CSS Styles — layout/structure VERBATIM. Only colors → charte crème, font Open Sans → Inter.
const styles = `
  .products-carousel {
    background-color: transparent;
    color: #FDF6EE;
    font-family: 'Inter', sans-serif;
    margin: 0;
    overflow-x: hidden;
  }

  .dark .products-carousel {
    background-color: transparent;
    color: #FDF6EE;
  }

  .col-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    min-height: 100vh;
    width: 90vw;
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .col-scroll {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;
      gap: 5vh;
      align-items: center;
    }
  }

  .col-scroll__box {
    display: flex;
    flex-direction: column;
    padding: 10vh 0 15vh;
  }

  .col-scroll__box--odd {
    flex-direction: column-reverse;
  }

  @media (max-width: 768px) {
    .col-scroll__box--odd {
      flex-direction: column;
      height: auto;
      padding: 0;
    }
    .col-scroll__box {
      width: 100%;
      align-items: center;
      padding: 2rem 0;
    }
  }

  .col-scroll__list {
    display: flex;
    flex-direction: column;
    will-change: transform;
    gap: 10vw;
  }

  .col-scroll__box--odd .col-scroll__list {
    flex-direction: column-reverse;
  }

  @media (max-width: 768px) {
    .col-scroll__box--odd .col-scroll__list {
      flex-direction: column;
    }
    .col-scroll__list {
      gap: 5vh;
    }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 20vw;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  @media (max-width: 768px) {
    .product-card {
      width: 90vw;
      margin: 0 0 10vh 0;
    }
    .product-card:last-child {
      margin-bottom: 0;
    }
  }

  .col-scroll__img-wrapper {
    position: relative;
    aspect-ratio: 0.8;
    width: 100%;
    margin-bottom: 0;
    overflow: hidden;
    border: none;
    padding: 0;
    background: transparent;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
  }

  .col-scroll__img-wrapper img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .product-img {
    z-index: 1;
    opacity: 1;
  }

  .model-img {
    z-index: 2;
    opacity: 0;
  }

  .product-card:hover .product-img,
  .product-card:active .product-img {
    opacity: 0;
  }

  .product-card:hover .model-img,
  .product-card:active .model-img {
    opacity: 1;
  }

  .product-card__info {
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 3;
    padding: 0 1.5rem;
    box-sizing: border-box;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .product-card:hover .product-card__info,
  .product-card:active .product-card__info {
    opacity: 0;
    transform: translateY(10px);
  }

  .product-card__title {
    margin: 0 0 0.5rem;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.3;
    color: #FDF6EE;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.65);
  }

  .dark .product-card__title {
    color: #FDF6EE;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.65);
  }

  .product-card__price-wrapper {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    color: #FF954F;
  }

  .dark .product-card__price-wrapper {
    color: #FF954F;
  }

  .product-card__price--old {
    text-decoration: line-through;
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  .product-card__btn {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    z-index: 4;
    opacity: 0;
    background: rgba(253, 246, 238, 0.95);
    border: 1px solid #FDF6EE;
    padding: 1rem 2rem;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s ease;
    white-space: nowrap;
    color: #2A1810;
  }

  .dark .product-card__btn {
    background: rgba(253, 246, 238, 0.95);
    border-color: #FDF6EE;
    color: #2A1810;
  }

  .product-card:hover .product-card__btn,
  .product-card:active .product-card__btn {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .product-card__btn:hover {
    background: #FF954F;
    color: #2A1810;
  }

  .dark .product-card__btn:hover {
    background: #FF954F;
    color: #2A1810;
  }

  @media (max-width: 768px) {
    .product-card__title {
      font-size: 1.1rem;
    }
    .product-card__price-wrapper {
      font-size: 1rem;
    }
    .product-card__btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.7rem;
    }
  }
`;

export default function ProductsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Only apply scroll animation on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const section = containerRef.current;
        if (!section) return;
        const odds = gsap.utils.toArray<HTMLElement>(".col-scroll__box--odd .col-scroll__list");

        /* Mouvement IDENTIQUE : colonnes impaires (1 & 3) qui défilent à CONTRE-SENS,
           lié au scroll (scrub). MAIS sans `pin` : on translate uniquement (transform),
           donc la grille 3 colonnes ne sort jamais du flux et ne s'effondre pas — les
           3 colonnes restent visibles côte à côte pendant tout le défilement. */
        odds.forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: 0 },
            {
              yPercent: 100,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main className="products-carousel">
        <div ref={containerRef} className="col-scroll">
          {/* Column 1 (Odd - reverse scroll) */}
          <div className="col-scroll__box col-scroll__box--odd">
            <div className="col-scroll__list">
              {COL_1_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Column 2 (Even - normal scroll) */}
          <div className="col-scroll__box">
            <div className="col-scroll__list">
              {COL_2_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Column 3 (Odd - reverse scroll) */}
          <div className="col-scroll__box col-scroll__box--odd">
            <div className="col-scroll__list">
              {COL_3_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <figure className="product-card">
      <div className="col-scroll__img-wrapper">
        <img className="product-img" src={product.prodImg} alt={product.title} loading="lazy" decoding="async" />
        <img className="model-img" src={product.modelImg} alt={product.title} loading="lazy" decoding="async" />

        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__price-wrapper">
            {product.oldPrice && (
              <span className="product-card__price--old">{product.oldPrice}</span>
            )}
            <span className="product-card__price">{product.price}</span>
          </div>
        </div>

        <button className="product-card__btn">Voir le projet +</button>
      </div>
    </figure>
  );
}
