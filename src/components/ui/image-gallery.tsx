/* ImageGallery — composant 21st.dev intégré STRICT VERBATIM.
 *
 * Aucune modification structurelle. Seul change : 6 URLs Unsplash demo
 * remplacées par 10 URLs photos GND (Supabase + proxy wsrv.nl pour resize
 * gratuit côté serveur, indispensable car Supabase originals 1-3 MB chacun).
 *
 * Poppins @import et global * font-family CONSERVÉS verbatim source —
 * potentiellement leak global sur la page entière (sélecteur universel
 * cascade), assume du choix du composant tel que fourni.
 */
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>


      <section className="w-full flex flex-col items-center justify-start py-12">

        <div className="max-w-3xl text-center px-4">
          <h1 className="text-3xl font-semibold">Our Latest Creations</h1>
          <p className="text-sm text-slate-500 mt-2">
            A visual collection of our most recent works – each piece crafted
            with intention, emotion, and style.
          </p>
        </div>

        {/* Галерея снизу */}
        <div className="flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 px-4">
          {[
            // 10 photos GND piped via wsrv.nl proxy (resize 900×1200 q75 → 50-120 KB/img)
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4002.JPG&w=900&h=1200&fit=cover&q=75&output=jpg",                   // VISION URBAINE
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A3992.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // ATTITUDE & CONFIANCE
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4028.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // ÉNERGIE COLLECTIVE
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // MASQUE & IDENTITÉ
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4135.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // L'ART EN MOUVEMENT
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4149.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // PUISSANCE CRÉATIVE
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4267.jpg&w=900&h=1200&fit=cover&q=75&output=jpg",                   // VISION MASQUÉE
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1817.JPG&w=900&h=1200&fit=cover&q=75&output=jpg",                   // SAVEURS
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1873%20-%20copie%202_1.jpg&w=900&h=1200&fit=cover&q=75&output=jpg", // INSTANTS
            "https://wsrv.nl/?url=https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A2054.JPG&w=900&h=1200&fit=cover&q=75&output=jpg",                   // PARTAGES
          ].map((src, idx) => (
            <div
              key={idx}
              className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
            >
              <img
                className="h-full w-full object-cover object-center"
                src={src}
                alt={`image-${idx}`}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
