#!/usr/bin/env node

// UberEats Integration Test Suite
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Starte UberEats Integration Tests...');

function testFileExists(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  assert(fs.existsSync(fullPath), `${description} nicht gefunden: ${filePath}`);
  console.log(`✅ ${description} gefunden`);
}

function testPackageJsonScripts() {
  console.log('\n📦 Teste package.json Scripts...');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredScripts = [
    'ubereats:integrate-all',
    'ubereats:setup',
    'dev:ubereats',
    'test:ubereats'
  ];

  requiredScripts.forEach(script => {
    assert(packageJson.scripts[script], `Script ${script} fehlt in package.json`);
    console.log(`✅ Script gefunden: ${script}`);
  });
}

function testServiceStructure() {
  console.log('\n🏗️  Teste Service-Struktur...');
  
  const services = [
    'backend/search-service/src/search.service.ts',
    'backend/cart-service/src/cart.service.ts',
    'frontend/components/Search/SearchBar.tsx',
    'frontend/components/Filters/RestaurantFilters.tsx',
    'frontend/services/search.service.ts'
  ];

  services.forEach(service => {
    testFileExists(service, `Service: ${service}`);
  });
}

function testDockerConfiguration() {
  console.log('\n🐳 Teste Docker-Konfiguration...');
  
  testFileExists('docker-compose.ubereats.yml', 'Docker Compose Datei');
  
  const dockerCompose = fs.readFileSync(
    path.join(__dirname, '..', 'docker-compose.ubereats.yml'), 
    'utf8'
  );
  
  // Teste wichtige Services
  const requiredServices = [
    'postgres', 'redis', 'elasticsearch', 'kibana',
    'api-gateway', 'search-service', 'cart-service'
  ];
  
  requiredServices.forEach(service => {
    assert(
      dockerCompose.includes(`${service}:`), 
      `Docker Service ${service} nicht konfiguriert`
    );
    console.log(`✅ Docker Service: ${service}`);
  });
}

function testDatabaseMigrations() {
  console.log('\n🗄️  Teste Datenbank-Migrationen...');
  
  testFileExists(
    'database/migrations/2025_01_add_menu_modifiers.sql',
    'Menü-Modifikatoren Migration'
  );
  
  const migration = fs.readFileSync(
    path.join(__dirname, '..', 'database/migrations/2025_01_add_menu_modifiers.sql'),
    'utf8'
  );
  
  // Teste wichtige Tabellen
  const requiredTables = [
    'menu_modifiers', 'modifier_options', 'allergens', 'menu_item_allergens'
  ];
  
  requiredTables.forEach(table => {
    assert(
      migration.includes(`CREATE TABLE IF NOT EXISTS ${table}`),
      `Tabelle ${table} nicht in Migration definiert`
    );
    console.log(`✅ Datenbank-Tabelle: ${table}`);
  });
}

function testElasticsearchSetup() {
  console.log('\n🔍 Teste Elasticsearch-Setup...');
  
  testFileExists('scripts/init-elasticsearch.js', 'Elasticsearch Init Script');
  
  const initScript = fs.readFileSync(
    path.join(__dirname, '..', 'scripts/init-elasticsearch.js'),
    'utf8'
  );
  
  // Teste wichtige Funktionen
  assert(
    initScript.includes('RESTAURANT_INDEX_MAPPING'),
    'Elasticsearch Index Mapping nicht definiert'
  );
  assert(
    initScript.includes('SAMPLE_RESTAURANTS'),
    'Sample Restaurant Daten nicht definiert'
  );
  
  console.log(`✅ Elasticsearch Index Mapping`);
  console.log(`✅ Sample Restaurant Daten`);
}

function testDocumentation() {
  console.log('\n📚 Teste Dokumentation...');
  
  const docs = [
    'UBEREATS_INTEGRATION.md',
    'README_UBEREATS_INTEGRATION.md'
  ];
  
  docs.forEach(doc => {
    testFileExists(doc, `Dokumentation: ${doc}`);
  });
}

function testTypeScriptTypes() {
  console.log('\n📝 Teste TypeScript-Typen...');
  
  const searchService = fs.readFileSync(
    path.join(__dirname, '..', 'frontend/services/search.service.ts'),
    'utf8'
  );
  
  // Teste wichtige Interfaces
  const requiredInterfaces = [
    'interface SearchQuery', 'interface Restaurant', 'interface MenuItem'
  ];
  
  requiredInterfaces.forEach(interfaceName => {
    assert(
      searchService.includes(interfaceName),
      `TypeScript Interface ${interfaceName} nicht definiert`
    );
    console.log(`✅ TypeScript Interface: ${interfaceName}`);
  });
}

async function runAllTests() {
  try {
    testPackageJsonScripts();
    testServiceStructure();
    testDockerConfiguration();
    testDatabaseMigrations();
    testElasticsearchSetup();
    testDocumentation();
    testTypeScriptTypes();
    
    console.log('\n🎉 Alle Tests erfolgreich! UberEats Integration ist bereit.');
    console.log('\nNächste Schritte:');
    console.log('1. npm run ubereats:integrate-all    # Vollständige Integration');
    console.log('2. http://localhost:3010             # Customer App öffnen');
    console.log('3. Test-Bestellung durchführen       # Funktionalität prüfen');
    
  } catch (error) {
    console.error('\n❌ Test fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

// Tests ausführen
runAllTests();