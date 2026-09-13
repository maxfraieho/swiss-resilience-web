// Build script: Pre-compiles JSX modules into a single production bundle
// Eliminates in-browser Babel, eliminates race conditions, accelerates mobile TMA load
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const rootDir = __dirname;
const files = [
  'Nav.jsx',
  'ServiceSwitcher.jsx',
  'MobileDrawer.jsx',
  'Hero.jsx',
  'CantonCalculator.jsx',
  'HousingCards.jsx',
  'DossierGenerator.jsx',
  'ProfessionSelector.jsx',
  'Sublease.jsx',
  'BenevolMentors.jsx',
  'BetaDonation.jsx',
  'Footer.jsx',
  'app.jsx'
];


async function ensureBabel() {
  const babelPath = '/tmp/babel.min.js';
  if (fs.existsSync(babelPath) && fs.statSync(babelPath).size > 1000000) {
    return fs.readFileSync(babelPath, 'utf8');
  }
  console.log('Downloading @babel/standalone...');
  return new Promise((resolve, reject) => {
    https.get('https://unpkg.com/@babel/standalone@7.29.0/babel.min.js', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(babelPath, data, 'utf8');
        resolve(data);
      });
      res.on('error', reject);
    });
  });
}

async function build() {
  console.log('1. Reading JSX sources in strict dependency order...');
  let combinedJsx = '/* Swiss Resilience Navigator 2.6 — Consolidated Bundle */\n';
  
  for (const f of files) {
    const filePath = path.join(rootDir, f);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    combinedJsx += `\n// ==================== [Module: ${f}] ====================\n` + content + '\n';
  }

  // Also save combined raw JSX for reference/debugging
  fs.writeFileSync(path.join(rootDir, 'app-bundle.jsx'), combinedJsx, 'utf8');
  console.log(`   Written app-bundle.jsx (${(combinedJsx.length / 1024).toFixed(1)} KB)`);

  console.log('2. Transpiling JSX -> JS via Babel...');
  const babelCode = await ensureBabel();
  const context = { window: {}, console: console, process: process };
  context.self = context.window;
  context.global = context.window;
  vm.createContext(context);
  vm.runInContext(babelCode, context);
  const Babel = context.Babel || context.window.Babel;

  const result = Babel.transform(combinedJsx, {
    presets: ['react'],
    compact: false
  });

  const bundleJs = result.code;
  const bundlePath = path.join(rootDir, 'app-bundle.js');
  fs.writeFileSync(bundlePath, bundleJs, 'utf8');
  console.log(`3. Generated ${bundlePath} (${(bundleJs.length / 1024).toFixed(1)} KB)`);

  // Also sync to hub, app, and mini-app subdirectories
  const syncDirs = ['hub', 'app', 'mini-app'];
  for (const dir of syncDirs) {
    const dirBundlePath = path.join(rootDir, dir, 'app-bundle.js');
    if (fs.existsSync(path.dirname(dirBundlePath))) {
      fs.writeFileSync(dirBundlePath, bundleJs, 'utf8');
      console.log(`   Synced to ${dirBundlePath}`);
    }
  }

  console.log('✅ Build complete!');
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
