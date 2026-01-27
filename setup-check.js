#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌱 KrishiSahay Setup Script');
console.log('==========================\n');

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Make sure you\'re in the project root directory.');
  process.exit(1);
}

console.log('✅ Project structure validated');

// Check for plant image
const plantImagePath = path.join(process.cwd(), 'src', 'assets', 'plant-hero.jpg');
const hasPlantImage = fs.existsSync(plantImagePath);

console.log(`📸 Plant image: ${hasPlantImage ? '✅ Found' : '⚠️  Not found (using online image)'}`);

// Check node version
const nodeVersion = process.versions.node;
const majorVersion = parseInt(nodeVersion.split('.')[0]);

if (majorVersion < 16) {
  console.warn(`⚠️  Warning: Node.js ${nodeVersion} detected. Recommended: v16 or higher`);
} else {
  console.log(`✅ Node.js ${nodeVersion} (Compatible)`);
}

// Installation status
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const hasNodeModules = fs.existsSync(nodeModulesPath);

console.log(`📦 Dependencies: ${hasNodeModules ? '✅ Installed' : '⚠️  Not installed'}`);

console.log('\n🚀 Quick Start Instructions:');
console.log('1. Install dependencies: npm install');
console.log('2. Start development server: npm run dev');
console.log('3. Open http://localhost:5173');

if (!hasPlantImage) {
  console.log('\n📸 Optional: Add your plant image');
  console.log('• Save as: src/assets/plant-hero.jpg');
  console.log('• Uncomment imports in Hero.jsx and Sidebar.jsx');
  console.log('• Remove online image URLs');
}

console.log('\n🎯 Features Available:');
console.log('• ✅ Multi-page application (Home, Solutions, Contact)');
console.log('• ✅ Dark/Light theme toggle');
console.log('• ✅ Responsive chatbot');
console.log('• ✅ Mobile-first design');
console.log('• ✅ Error boundaries');
console.log('• ✅ 404 page');

console.log('\n📚 Need help?');
console.log('• Check README.md for detailed documentation');
console.log('• Use the in-app chatbot for farming questions');
console.log('• Contact: contact@krishisahay.com');

console.log('\n🎉 Happy farming with KrishiSahay! 🌱');
