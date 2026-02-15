import React, { useEffect } from 'react';

const About: React.FC = () => {
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

  return (
    <section
      id="qui-sommes-nous"
      className="py-32 bg-gray-100"
      aria-labelledby="about-title"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image left */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-t-full overflow-hidden bg-gray-200">
                {/* Placeholder image - will come from Supabase */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-24 h-24 bg-white rounded-full shadow-lg flex flex-col items-center justify-center">
                <span className="font-display font-bold text-2xl text-black">15+</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">projets</span>
              </div>
            </div>
          </div>

          {/* Text right */}
          <div className="lg:col-span-7 reveal delay-100">
            {/* Tag */}
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
              À Propos
            </span>

            <h2
              id="about-title"
              className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black mb-6"
            >
              L'intersection de l'humain & de la tech.
            </h2>

            <div className="space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>
                Studio créatif alliant créativité humaine et intelligence artificielle
                pour des projets audiovisuels et digitaux d'exception. Basé à Paris,
                GND Consulting accompagne marques, artistes et entreprises dans leur
                transformation digitale.
              </p>
              <p>
                De la production audiovisuelle au design graphique, du motion design
                à l'automatisation par IA, nous créons des expériences qui marquent les esprits
                et génèrent des résultats concrets.
              </p>
            </div>

            {/* Tags cards */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { label: 'Stratégie', icon: 'target' },
                { label: 'Création', icon: 'brush' },
                { label: 'Tech', icon: 'smart_toy' },
              ].map((tag) => (
                <div
                  key={tag.label}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <span className="material-symbols-outlined text-2xl text-gray-400 mb-2 block">
                    {tag.icon}
                  </span>
                  <span className="text-sm font-medium text-black">{tag.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
