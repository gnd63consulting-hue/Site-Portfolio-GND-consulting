/* bento-gallery — composant 21st.dev adapté GND.
 * Grille bento horizontale draggable (framer-motion drag="x") + modal plein
 * écran au clic. Adaptations charte : fond transparent (la Section fournit le
 * crème), overlay chocolat au lieu de noir, coins arrondis + ombre chaude,
 * en-tête (titre/description) optionnel — la page fournit son propre header
 * Kicker + h2. Pas de "use client" (Vite, pas Next).
 */
import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// Structure de chaque image de la galerie
export type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string; // classes Tailwind de span (ex. "md:col-span-2")
};

interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[];
  /** Optionnels : si absents, la page fournit son propre header au-dessus */
  title?: string;
  description?: string;
}

// Stagger des enfants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Entrée de chaque tuile
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

// Modal d'affichage de l'image sélectionnée
const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-text-strong/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[88vh] w-full rounded-2xl object-contain"
        />
        <div className="mt-3 text-center">
          <p className="text-bg font-medium">{item.title}</p>
          <p className="text-bg/60 text-sm">{item.desc}</p>
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-bg/10 text-bg/80 transition-colors hover:bg-accent hover:text-text-strong"
        aria-label="Fermer l'aperçu"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
};

// Galerie principale
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Limite de drag = largeur de la grille - largeur visible
  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gridWidth = gridRef.current.scrollWidth;
        const newConstraint = Math.min(0, containerWidth - gridWidth - 32);
        setDragConstraint(newConstraint);
      }
    };

    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, [imageItems]);

  // Fondu doux à l'entrée/sortie de la section au scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.25, 1, 1, 0.25]);

  return (
    <section ref={targetRef} className="relative w-full overflow-hidden">
      {(title || description) && (
        <div className="container mx-auto px-4 text-center">
          {title && (
            <h2 className="display text-4xl md:text-5xl text-text-strong">{title}</h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-text leading-relaxed">{description}</p>
          )}
        </div>
      )}

      <motion.div
        ref={containerRef}
        style={{ opacity }}
        className="relative mt-8 w-full cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            className="grid auto-cols-[minmax(16rem,1fr)] grid-rows-2 grid-flow-col gap-4 px-4 md:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  'group relative flex h-full min-h-[15rem] w-full min-w-[16rem] cursor-pointer items-end overflow-hidden rounded-2xl border border-text-strong/10 p-4 transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-alt',
                  item.span,
                )}
                style={{ boxShadow: '0 12px 36px rgba(83,36,24,0.12)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                tabIndex={0}
                aria-label={`Voir ${item.title}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(42,24,16,0.82)] via-[rgba(42,24,16,0.35)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-bold text-bg">{item.title}</h3>
                  <p className="mt-1 text-sm text-bg/80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveImageBentoGallery;
