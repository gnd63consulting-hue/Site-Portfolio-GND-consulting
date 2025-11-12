#!/usr/bin/env node

console.log('🚨 SOLUTION RADICALE POUR LES VIDÉOS SUPABASE');
console.log('============================================');

console.log('\n🔍 Problème identifié :');
console.log('Le Service Worker est encore actif et intercepte les requêtes Supabase');
console.log('malgré nos corrections précédentes !');

console.log('\n🔧 Solutions appliquées :');
console.log('1. Désactivation FORCÉE de tous les Service Workers');
console.log('2. Empêchement de l\'enregistrement de nouveaux Service Workers');
console.log('3. Script de nettoyage du cache créé');

console.log('\n📋 Instructions URGENTES :');
console.log('1. Ouvrez la console du navigateur (F12)');
console.log('2. Allez sur localhost:5174/clear-cache.js');
console.log('3. OU tapez dans la console :');
console.log('   navigator.serviceWorker.getRegistrations().then(r => r.forEach(s => s.unregister()))');
console.log('4. Rechargez la page (Ctrl+F5 ou Cmd+Shift+R)');
console.log('5. Vérifiez dans la console qu\'il n\'y a plus de Service Workers');

console.log('\n🎯 Alternative si ça ne marche toujours pas :');
console.log('1. Ouvrez Chrome en mode incognito');
console.log('2. Allez sur localhost:5174/#portfolio');
console.log('3. Les vidéos devraient fonctionner sans Service Worker');

console.log('\n✅ Le Service Worker est le seul obstacle restant !');
console.log('Une fois désactivé, les vidéos Supabase fonctionneront parfaitement ! 🎬');
