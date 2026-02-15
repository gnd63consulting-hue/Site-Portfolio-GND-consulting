import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { videosData } from '../data/videosData';

// Helper to get YouTube embed URL
const getYouTubeEmbedUrl = (rawUrl: string): string => {
  try {
    const url = new URL(rawUrl);
    if (url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.replace('/', '');
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
    }
    if (url.pathname.startsWith('/embed/')) {
      return `https://www.youtube-nocookie.com${url.pathname}?rel=0&modestbranding=1&autoplay=1`;
    }
    const videoId = url.searchParams.get('v');
    if (!videoId) return '';
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
  } catch {
    return '';
  }
};

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof videosData[0] | null>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  // Show 4 projects in asymmetric grid (2 pairs)
  const projects = videosData.slice(0, 4);

  return (
    <section id="realisations" className="py-32" aria-labelledby="portfolio-title">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
            Portfolio
          </span>
          <h2
            id="portfolio-title"
            className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black mb-4"
          >
            Réalisations
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Découvrez nos derniers projets audiovisuels et créatifs
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => {
            const isEvenCol = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`reveal ${isEvenCol ? 'delay-150 md:mt-24' : 'delay-75'}`}
              >
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group block w-full text-left"
                  aria-label={`Voir le projet ${project.title}`}
                >
                  {/* Image container */}
                  <div
                    className={`relative overflow-hidden rounded-2xl ${
                      isEvenCol ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Arrow button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                      </div>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-black group-hover:text-gray-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="border border-gray-300 rounded-full text-xs uppercase tracking-[0.15em] px-3 py-1 text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* View all button */}
        <div className="reveal mt-16 text-center">
          <a
            href="#realisations"
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Voir tout le portfolio
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Video */}
            <div className="aspect-video">
              {selectedProject.videoSource === 'youtube' ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedProject.videoUrl)}
                  className="w-full h-full"
                  title={selectedProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedProject.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                />
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-white/60">{selectedProject.credits}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
