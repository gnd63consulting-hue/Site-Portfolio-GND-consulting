import React from 'react';

export function ValuesSection() {
  const values = [
    { id: 'passion', title: 'Passion', description: 'Nous mettons notre cœur dans chaque projet' },
    { id: 'reliability', title: 'Fiabilité', description: 'Engagement total envers la qualité et les délais' },
    { id: 'innovation', title: 'Innovation', description: "À la pointe des dernières technologies, nous intégrons l'IA et l'automatisation pour maximiser l'impact de chaque projet." },
    { id: 'collaboration', title: 'Collaboration', description: 'Partenaire de confiance dans votre réussite' },
  ];

  return (
    <section id="values-section" className="reveal py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-16">
          <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-6">
            ADN GND
          </span>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
            Nos Valeurs Fondatrices
          </h2>
          <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Les principes qui guident notre approche et nous engagent à offrir des expériences mémorables.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-[#64748B] group-hover:text-gray-400 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
