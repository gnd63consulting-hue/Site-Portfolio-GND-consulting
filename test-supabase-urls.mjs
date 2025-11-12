#!/usr/bin/env node

console.log('🔍 TEST DES URLs SUPABASE');
console.log('========================');

const videos = [
  {
    title: "Esther Seems - Bobine",
    filename: "Esther Seems - Bobine.mp4",
    url: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Esther%20Seems%20-%20Bobine.mp4"
  },
  {
    title: "TRINITY REBEL FT DAFXCX L UNIVERS OFFICIEL", 
    filename: "trinity_rebel_univers_officiel.mp4",
    url: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4"
  },
  {
    title: "LEYEL - Miel",
    filename: "Miel test website.mp4", 
    url: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Miel%20test%20website.mp4"
  }
];

console.log('\n📋 URLs à tester manuellement :');
videos.forEach((video, index) => {
  console.log(`\n${index + 1}. ${video.title}`);
  console.log(`   Fichier: ${video.filename}`);
  console.log(`   URL: ${video.url}`);
});

console.log('\n🔧 Instructions :');
console.log('1. Copiez chaque URL ci-dessus');
console.log('2. Collez-la dans un nouvel onglet du navigateur');
console.log('3. Vérifiez si la vidéo se charge directement');
console.log('4. Si elle ne se charge pas, le problème vient de Supabase Storage');
console.log('5. Si elle se charge, le problème vient du code React');

console.log('\n🚨 Solutions possibles :');
console.log('- Vérifier les permissions du bucket Supabase');
console.log('- Vérifier que les fichiers existent dans le storage');
console.log('- Vérifier la configuration CORS de Supabase');
console.log('- Désactiver temporairement le Service Worker');

console.log('\n✅ Testez ces URLs et dites-moi le résultat !');
