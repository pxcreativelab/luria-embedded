#!/usr/bin/env node

/**
 * Script de verificação de segurança para NPM
 * Verifica se arquivos sensíveis não estão sendo incluídos
 */

import fs from 'fs';
import path from 'path';

const SENSITIVE_FILES = [
  '.env',
  '.env.local',
  '.env.development',
  '.env.production',
  '.env.test',
  '.npmrc',
  'package-lock.json',
  'yarn.lock'
];

const SENSITIVE_PATTERNS = [
  /\.env$/,
  /\.env\..*/,
  /\.npmrc$/,
  /package-lock\.json$/,
  /yarn\.lock$/,
  /pnpm-lock\.yaml$/
];

function checkSensitiveFiles() {
  console.log('🔒 Verificando arquivos sensíveis...');
  
  let hasErrors = false;
  
  // Verificar se arquivos sensíveis existem
  SENSITIVE_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`⚠️  Arquivo sensível encontrado: ${file}`);
      console.log(`   → Certifique-se de que está no .gitignore e .npmignore`);
    }
  });
  
  // Verificar package.json files
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  let files = packageJson.files || [];
  
  // Lidar com casos onde files pode ser string ou array
  if (typeof files === 'string') {
    try {
      files = JSON.parse(files);
    } catch (e) {
      console.log('⚠️  Campo "files" é string mas não é JSON válido, tratando como array vazio');
      files = [];
    }
  }
  
  // Garantir que files é um array
  if (!Array.isArray(files)) {
    console.log('⚠️  Campo "files" não é um array, tratando como array vazio');
    files = [];
  }
  
  console.log('\n📦 Verificando campo "files" do package.json...');
  console.log(`   Arquivos incluídos: ${files.join(', ')}`);
  
  // Verificar se algum arquivo sensível está sendo incluído
  files.forEach(file => {
    if (SENSITIVE_PATTERNS.some(pattern => pattern.test(file))) {
      console.log(`❌ ERRO: Arquivo sensível incluído: ${file}`);
      hasErrors = true;
    }
  });
  
  // Verificar se dist/embedded existe e não contém arquivos sensíveis
  const distPath = 'dist/embedded';
  if (fs.existsSync(distPath)) {
    console.log('\n📁 Verificando build dist/embedded...');
    
    function checkDirectory(dir) {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          checkDirectory(fullPath);
        } else if (SENSITIVE_PATTERNS.some(pattern => pattern.test(item))) {
          console.log(`❌ ERRO: Arquivo sensível no build: ${fullPath}`);
          hasErrors = true;
        }
      });
    }
    
    checkDirectory(distPath);
  }
  
  // Verificar .npmignore
  if (fs.existsSync('.npmignore')) {
    console.log('\n✅ .npmignore encontrado');
    
    const npmignore = fs.readFileSync('.npmignore', 'utf8');
    if (npmignore.includes('.env')) {
      console.log('✅ .env está no .npmignore');
    } else {
      console.log('⚠️  .env não está no .npmignore');
    }
  } else {
    console.log('\n⚠️  .npmignore não encontrado');
  }
  
  if (hasErrors) {
    console.log('\n❌ ERROS ENCONTRADOS! Corrija antes de publicar.');
    process.exit(1);
  } else {
    console.log('\n✅ Verificação de segurança concluída com sucesso!');
  }
}

// Executar verificação
checkSensitiveFiles(); 