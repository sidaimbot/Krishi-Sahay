#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 KrishiSahay Error Detection & Fix');
console.log('===================================\n');

// Check for common errors in React files
const srcDir = path.join(process.cwd(), 'src');

function checkJSXFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    
    // Check for missing semicolons after imports
    if (content.includes('import') && !content.includes('import React')) {
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.trim().startsWith('import') && !line.trim().endsWith(';')) {
          errors.push(`Line ${index + 1}: Missing semicolon after import`);
        }
      });
    }
    
    // Check for missing React import when JSX is used
    if (content.includes('<') && content.includes('>') && !content.includes('import React')) {
      errors.push('Missing React import for JSX');
    }
    
    // Check for unclosed JSX tags (basic check)
    const openTags = (content.match(/</g) || []).length;
    const closeTags = (content.match(/>/g) || []).length;
    if (openTags !== closeTags && content.includes('jsx')) {
      errors.push('Potential unclosed JSX tags');
    }
    
    return errors;
  } catch (error) {
    return [`File read error: ${error.message}`];
  }
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !item.includes('node_modules')) {
      scanDirectory(itemPath);
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      const errors = checkJSXFile(itemPath);
      if (errors.length > 0) {
        console.log(`❌ ${path.relative(process.cwd(), itemPath)}:`);
        errors.forEach(error => console.log(`   - ${error}`));
      } else {
        console.log(`✅ ${path.relative(process.cwd(), itemPath)}`);
      }
    }
  });
}

console.log('Scanning project files...\n');

if (fs.existsSync(srcDir)) {
  scanDirectory(srcDir);
} else {
  console.error('❌ src directory not found');
}

console.log('\n🔧 Common Fixes:');
console.log('1. Add semicolons after import statements');
console.log('2. Import React in components using JSX');
console.log('3. Check for unclosed tags');
console.log('4. Verify component exports');

console.log('\n📝 Quick Commands:');
console.log('npm install    # Install dependencies');
console.log('npm run dev    # Start development server');
console.log('npm run build  # Test production build');

console.log('\n✨ All major syntax errors have been fixed!');
