import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Camera, Users, Quote, ExternalLink, Star, Award, Zap, Shield, Play, ArrowRight } from 'lucide-react';

export function Partners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('noceum');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string>('');

  // Images du carrousel Noceum
  const nocuemGallery = [
    {
      image: "/PHOTO-2025-07-13-18-18-00.jpg",
      caption: "Moments intimes capturés avec sincérité"
    },
    {
      image: "/PHOTO-2025-07-13-18-18-01.jpg",
      caption: "L'émotion au cœur de chaque image"
    },
    {
      image: "/PHOTO-2025-07-13-18-18-02.jpg",
      caption: "Des souvenirs pour l'éternité"
    },
    {
      image: "/PHOTO-2025-07-13-18-18-01 2.jpg",
      caption: "Chaque détail raconte une histoire"
    },
    {
      image: "/PHOTO-2025-07-13-18-18-00 2.jpg",
      caption: "L'art de transmettre l'amour"
    }
  ];

  // Auto-play du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % nocuemGallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % nocuemGallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + nocuemGallery.length) % nocuemGallery.length);
  };

  const openImageModal = (image: string, caption: string) => {
    setSelectedImage(image);
    setSelectedCaption(caption);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedCaption('');
  };
  const partners = [
    {
      id: 'noceum',
      name: "NOCÉUM",
      tagline: "Films de Mariage Cinématographiques",
      description: "Nocéum transforme vos moments les plus précieux en œuvres cinématographiques intemporelles. À travers des interviews intimes et une narration soignée, nous créons l'héritage visuel de votre amour.",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      url: "https://noceum.fr",
      quote: "Ce que vous vivez aujourd'hui mérite d'être transmis demain.",
      features: ["Films cinématographiques", "Interviews intimes", "Narration personnalisée", "Héritage familial"]
    },
    {
      id: 'innovup',
      name: "INNOVUP MIND",
      tagline: "Innovation & Transformation Digitale",
      description: "Spécialiste de la transformation digitale et de l'innovation technologique pour les entreprises modernes.",
      icon: Zap,
      color: "from-blue-500 to-blue-500",
      bgColor: "bg-blue-50",
      url: "#",
      quote: "L'innovation au service de votre croissance.",
      features: ["Transformation digitale", "Solutions innovantes", "Accompagnement tech", "Stratégie numérique"]
    },
    {
      id: 'grprod',
      name: "GR PRODUCTION",
      tagline: "Production Audiovisuelle Premium",
      description: "Production audiovisuelle haut de gamme avec une expertise technique reconnue dans l'industrie.",
      icon: Camera,
      color: "from-blue-500 to-blue-500",
      bgColor: "bg-blue-50",
      url: "#",
      quote: "Excellence technique et créativité sans limites.",
      features: ["Production 4K/8K", "Équipe experte", "Matériel professionnel", "Post-production avancée"]
    },
    {
      id: 'creative',
      name: "CREATIVE STUDIO",
      tagline: "Design & Créativité",
      description: "Solutions créatives et design premium pour les marques qui veulent se démarquer.",
      icon: Star,
      color: "from-blue-500 to-pink-500",
      bgColor: "bg-pink-50",
      url: "#",
      quote: "Votre vision, notre créativité.",
      features: ["Design premium", "Identité visuelle", "Branding complet", "Solutions créatives"]
    }
  ];

  const currentPartner = partners.find(p => p.id === activeTab) || partners[0];
  const IconComponent = currentPartner.icon;

  return (
    <section id="partners" className="py-12 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Fond avec formes organiques */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Formes décoratives organiques */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"></div>
      
      {/* Navigation par onglets */}
      <div className="flex justify-center mb-10 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3 inline-flex gap-3 shadow-xl border border-slate-200/50">
          {partners.map((partner) => {
            const PartnerIcon = partner.icon;
            return (
              <button
                key={partner.id}
                onClick={() => setActiveTab(partner.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                  activeTab === partner.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <PartnerIcon className="w-5 h-5" />
                <span className="hidden sm:block">{partner.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu du partenaire actif */}
      <div className="relative z-10">
        {/* Carte principale avec design organique */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-2xl overflow-hidden relative">
          {/* Effet de lueur subtile */}
          <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-sm opacity-60"></div>
          
          {/* Contenu principal */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50">
        
            {/* Section principale */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Colonne gauche - Contenu */}
              <div className="p-12 flex flex-col justify-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${currentPartner.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-4xl font-black text-slate-900 mb-3">
                  {currentPartner.name}
                </h3>
                
                <p className="text-xl font-semibold text-slate-600 mb-8">
                  {currentPartner.tagline}
                </p>
                
                <p className="text-slate-700 text-lg leading-relaxed mb-8">
                  {currentPartner.description}
                </p>
                
                {/* Citation avec design organique */}
                <div className="relative mb-8">
                  <div className={`${currentPartner.bgColor} rounded-3xl p-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                    <Quote className="w-10 h-10 text-slate-400 mb-4 relative z-10" />
                    <blockquote className="text-slate-800 text-lg font-medium italic relative z-10">
                      "{currentPartner.quote}"
                    </blockquote>
                    </div>
                  </div>
                </div>
                
                {/* CTA avec design moderne */}
                <div className="flex gap-4">
                  <a 
                    href={currentPartner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentPartner.color} text-white rounded-2xl font-semibold transition-all duration-500 hover:scale-105 hover:shadow-xl`}
                  >
                    <span>Découvrir</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-500 hover:scale-105">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Colonne droite - Visuel avec design organique */}
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200">
                {activeTab === 'noceum' ? (
                  // Écran Society Studios style moderne
                  <div className="h-full min-h-[600px] rounded-r-[2.5rem] overflow-hidden bg-black relative">
                    {/* Formes géométriques en arrière-plan */}
                    <div className="absolute inset-0">
                      {/* Cercles flottants */}
                      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-slate-600/30 to-slate-800/30 rounded-full blur-sm"></div>
                      <div className="absolute top-40 right-40 w-24 h-24 bg-gradient-to-br from-slate-500/20 to-slate-700/20 rounded-full blur-md"></div>
                      <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-slate-700/25 to-slate-900/25 rounded-full blur-lg"></div>
                      
                      {/* Formes géométriques abstraites */}
                      <div className="absolute top-16 left-20 w-20 h-20 border border-slate-600/30 rounded-lg rotate-45 blur-sm"></div>
                      <div className="absolute bottom-20 left-32 w-16 h-16 border border-slate-500/20 rounded-full blur-md"></div>
                    </div>
                    
                    {/* Boutons de navigation en haut */}
                    <div className="absolute top-6 left-6 z-20">
                      <button className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <span className="text-white text-lg font-light">+</span>
                      </button>
                    </div>
                    
                    <div className="absolute top-6 right-6 z-20">
                      <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <span className="text-white text-xs font-medium tracking-wide">LET'S TALK</span>
                      </button>
                    </div>
                    
                    {/* Titre principal centré */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        {/* Photos carousel en arrière-plan */}
                        <div className="absolute inset-0 -z-10">
                          {nocuemGallery.map((item, index) => (
                            <div
                              key={index}
                              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                                index === currentSlide 
                                  ? 'opacity-100 scale-100' 
                                  : 'opacity-0 scale-100'
                              }`}
                              onClick={() => openImageModal(item.image, item.caption)}
                            >
                              <img
                                src={item.image}
                                alt={`Photo showcase - ${item.caption} - Projet NOCUEM par GND Consulting`}
                                className="w-full h-full object-cover cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Miniature vidéo en bas à gauche */}
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="w-48 h-32 bg-slate-800 rounded-xl overflow-hidden border border-white/20 relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                        {/* Images carousel dans la miniature */}
                        {nocuemGallery.map((item, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                              index === currentSlide 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                            }`}
                            onClick={() => openImageModal(item.image, item.caption)}
                          >
                            <img
                              src={item.image}
                              alt={`Miniature showcase - ${item.caption} - Projet NOCUEM`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay play button */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Play className="w-5 h-5 text-black ml-0.5" />
                              </div>
                            </div>
                            
                            {/* Badge PLAY en bas */}
                            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                              <div className="flex items-center gap-2">
                                <Play className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-medium">PLAY</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bouton DISCOVER en bas à droite */}
                    <div className="absolute bottom-6 right-6 z-20">
                      <button className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                        <span className="text-white text-sm font-medium tracking-wide group-hover:tracking-wider transition-all duration-300">DISCOVER</span>
                      </button>
                    </div>
                    
                    {/* Contrôles de navigation pour les images */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 border border-white/20 transition-all duration-300 z-30 opacity-50 hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 border border-white/20 transition-all duration-300 z-30 opacity-50 hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Indicateurs de slide */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {nocuemGallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-white scale-125' 
                              : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Design organique pour les autres partenaires
                  <div className="h-full min-h-[500px] flex items-center justify-center rounded-r-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50"></div>
                    <div className={`relative w-40 h-40 bg-gradient-to-br ${currentPartner.color} rounded-full flex items-center justify-center shadow-2xl`}>
                      <div className="absolute inset-4 bg-white/20 rounded-full"></div>
                      <IconComponent className="w-20 h-20 text-white relative z-10" />
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {[
          { number: "4+", label: "Partenaires Premium", icon: Star },
          { number: "100+", label: "Projets Collaboratifs", icon: Users },
          { number: "95%", label: "Satisfaction Client", icon: Heart },
          { number: "24h", label: "Temps de Réponse", icon: Zap }
        ].map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <StatIcon className="w-6 h-6 text-slate-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* CTA final */}
      <div className="text-center mt-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 border border-slate-200/50 shadow-2xl relative overflow-hidden">
          {/* Formes décoratives dans le CTA */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full translate-x-20 translate-y-20"></div>
          
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            Rejoignez Notre Écosystème
          </h3>
          <p className="text-slate-600 text-base mb-6 max-w-2xl mx-auto">
            Découvrez comment nos partenariats d'exception peuvent transformer votre projet en une réalisation extraordinaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact"
              className="px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-bold rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl relative z-10"
            >
              Démarrer un Projet
            </a>
            <a 
              href="#realisations"
              className="px-10 py-5 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl transition-all duration-500 hover:bg-slate-50 hover:border-slate-400 hover:scale-105 relative z-10"
            >
              Voir Nos Réalisations
            </a>
          </div>
        </div>
      </div>

      {/* Modal pour les images */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 w-12 h-12 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center transition-all duration-300 border border-red-500/40 z-10"
            >
              <span className="text-red-400 text-xl font-bold">×</span>
            </button>
            
            {/* Navigation dans le modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = nocuemGallery.findIndex(item => item.image === selectedImage);
                const prevIdx = (currentIdx - 1 + nocuemGallery.length) % nocuemGallery.length;
                setSelectedImage(nocuemGallery[prevIdx].image);
                setSelectedCaption(nocuemGallery[prevIdx].caption);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-400/20 hover:border-blue-400 border border-white/20 transition-all duration-300 z-10 shadow-lg hover:scale-110"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = nocuemGallery.findIndex(item => item.image === selectedImage);
                const nextIdx = (currentIdx + 1) % nocuemGallery.length;
                setSelectedImage(nocuemGallery[nextIdx].image);
                setSelectedCaption(nocuemGallery[nextIdx].caption);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-400/20 hover:border-blue-400 border border-white/20 transition-all duration-300 z-10 shadow-lg hover:scale-110"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            
            <img
              src={selectedImage}
              alt={`Image agrandie - ${selectedCaption} - Projet NOCUEM showcase GND Consulting`}
              className="w-full h-full object-contain rounded-3xl shadow-2xl border border-blue-400/30"
              onClick={(e) => e.stopPropagation()}
            />
            
            {selectedCaption && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/30">
                <p className="text-white text-center font-medium italic text-lg">"{selectedCaption}"</p>
                <div className="flex justify-center mt-3">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-400 rounded-full"></div>
                </div>
              </div>
            )}
            
            {/* Indicateurs de position */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {nocuemGallery.map((_, index) => {
                const currentIdx = nocuemGallery.findIndex(item => item.image === selectedImage);
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(nocuemGallery[index].image);
                      setSelectedCaption(nocuemGallery[index].caption);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIdx 
                        ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50 border-2 border-white/30' 
                        : 'bg-white/30 hover:bg-blue-400/70 border border-white/20'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
