/* SocialCard — clone exact 21st.dev (shailendrakumar19999/social-card).
 *
 * Architecture identique au composant original :
 *   - .card 200x200, bg gris, border blanc, overflow hidden, transition 1s
 *   - .background absolute inset:0, gradient bleu→rose→jaune
 *   - .box1/2/3/4 sizes décroissantes (70%/50%/30%/10%), off-screen au repos
 *     (bottom: -X%, left: -X%) avec transition-delays staggered (0/0.2/0.4/0.6s)
 *   - On card:hover → toutes glissent à bottom:-1px left:-1px (collées coin)
 *   - Border-radius asymétrique blob 10% 13% 42% 0% / 10% 12% 75% 0%
 *   - transform-origin: 0 100% (bottom-left pivot)
 *   - .logo centré idle, translate(70px, -52px) top-right au hover
 *
 * Adaptation GND : seuls les gradients des box2/box3 changent (LinkedIn/Behance
 * au lieu de Twitter/Discord). Le reste = pixel-identique à la démo.
 */
'use client';

import React from 'react';

const InstagramSvg = () => (
  <svg className="svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
  </svg>
);

const LinkedInSvg = () => (
  <svg className="svg" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const BehanceSvg = () => (
  <svg className="svg" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
  </svg>
);

export type SocialCardProps = {
  title?: string;
  className?: string;
};

export function SocialCard({ title = 'Socials', className }: SocialCardProps) {
  return (
    <>
      <style>{`
        .sc-card {
          /* GND palette : base cream, border cream subtle */
          background: #FDF6EE;
          border: 2px solid rgba(253, 246, 238, 0.95);
          border-radius: 30px;
          width: 180px;
          height: 180px;
          transition: 1s ease-in-out;
          position: relative;
          overflow: hidden;
          box-shadow: rgba(42, 24, 16, 0.18) 0px 7px 29px;
        }
        .sc-card:hover {
          transform: scale(1.1);
        }
        .sc-background {
          /* Gradient warm GND : cream-peach → accent orange peak → cream */
          background-color: #FF954F;
          background-image: linear-gradient(43deg, #FFE2C2 0%, #FF954F 46%, #FDF6EE 100%);
          position: absolute;
          inset: 0;
        }

        .sc-logo {
          color: rgb(255, 255, 255);
          letter-spacing: 3px;
          font-size: 1.3em;
          font-weight: 600;
          transition: 0.6s ease-in-out;
          position: absolute;
          bottom: 50%;
          right: 50%;
          transform: translate(50%, 50%);
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          text-decoration: none;
          z-index: 5;
          pointer-events: none;
        }
        .sc-card:hover .sc-logo {
          letter-spacing: 0px;
          transform: translate(63px, -47px);
        }

        .sc-box {
          text-align: right;
          transform-origin: 0 100%;
          /* Glass cream au lieu de glass blanc pour cohérence palette GND */
          background: rgba(253, 246, 238, 0.42);
          border-top: 2px solid rgba(253, 246, 238, 0.95);
          border-right: 1px solid rgba(253, 246, 238, 0.95);
          border-radius: 10% 13% 42% 0% / 10% 12% 75% 0%;
          padding: 10px;
          transition: 1s ease-in-out;
          position: absolute;
          box-shadow: rgba(42, 24, 16, 0.30) -7px 7px 29px 0px;
          text-decoration: none;
          display: block;
        }
        .sc-box::before {
          content: "";
          border-radius: inherit;
          opacity: 0;
          transition: 0.5s ease-in-out;
          position: absolute;
          inset: 0;
        }
        .sc-card:hover .sc-box {
          bottom: -1px;
          left: -1px;
        }

        /* box1 = Instagram (back, large) */
        .sc-box1 {
          width: 70%;
          height: 70%;
          bottom: -70%;
          left: -70%;
        }
        .sc-box1::before {
          /* GND warm spectrum : cream → peach → accent → touche chocolat tip */
          background: radial-gradient(circle at 30% 107%, #FFF6E8 0%, #FFD9B5 5%, #FF954F 60%, #2A1810 95%);
        }
        .sc-box1:hover::before {
          opacity: 1;
        }
        .sc-box1:hover .sc-icon .svg {
          filter: drop-shadow(0 0 5px #fff);
        }

        /* box2 = LinkedIn (middle) */
        .sc-box2 {
          width: 50%;
          height: 50%;
          bottom: -50%;
          left: -50%;
          transition-delay: 0.2s;
        }
        .sc-box2::before {
          /* GND warm light : cream-peach → accent muted */
          background: radial-gradient(circle at 30% 107%, #FFE9D5, #FFB079 90%);
        }
        .sc-box2:hover::before {
          opacity: 1;
        }
        .sc-box2:hover .sc-icon .svg {
          filter: drop-shadow(0 0 5px #fff);
        }

        /* box3 = Behance (front, small) */
        .sc-box3 {
          width: 30%;
          height: 30%;
          bottom: -30%;
          left: -30%;
          transition-delay: 0.4s;
        }
        .sc-box3::before {
          /* GND warm deep : accent doré → accent profond */
          background: radial-gradient(circle at 30% 107%, #FFB585, #C66525 90%);
        }
        .sc-box3:hover::before {
          opacity: 1;
        }
        .sc-box3:hover .sc-icon .svg {
          filter: drop-shadow(0 0 5px #fff);
        }

        /* box4 = decorative tiny corner accent */
        .sc-box4 {
          width: 10%;
          height: 10%;
          bottom: -10%;
          left: -10%;
          transition-delay: 0.6s;
        }

        .sc-icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          position: relative;
          z-index: 1;
        }
        .sc-icon .svg {
          fill: rgba(255, 255, 255, 0.797);
          width: 100%;
          transition: 0.5s ease-in-out;
        }
        .sc-box:hover .svg {
          fill: rgb(255, 255, 255);
        }
      `}</style>

      <div className={`sc-card ${className ?? ''}`} role="group" aria-label={title}>
        <div className="sc-background" aria-hidden="true" />

        <a
          href="https://www.instagram.com/gndconsulting/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="sc-box sc-box1"
        >
          <span className="sc-icon"><InstagramSvg /></span>
        </a>

        <a
          href="https://linkedin.com/in/roodny-pierre"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="sc-box sc-box2"
        >
          <span className="sc-icon"><LinkedInSvg /></span>
        </a>

        <a
          href="https://www.behance.net/gndconsulting"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Behance"
          className="sc-box sc-box3"
        >
          <span className="sc-icon"><BehanceSvg /></span>
        </a>

        <span className="sc-box sc-box4" aria-hidden="true" />

        <div className="sc-logo">{title}</div>
      </div>
    </>
  );
}
