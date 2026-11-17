const fs = require('node:fs');
const path = require('node:path');

const frontendDirectory = __dirname;
const outputDirectory = path.join(frontendDirectory, 'dist');

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    fs.readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => {
        const separator = line.indexOf('=');
        if (separator < 0) {
          return null;
        }
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
        return [key, value];
      })
      .filter(Boolean),
  );
}

const env = readEnvFile(path.join(frontendDirectory, '.env'));
const apiBaseUrl = (process.env.API_BASE_URL || env.API_BASE_URL || '').replace(/\/+$/, '');
if (!apiBaseUrl) {
  throw new Error('Set API_BASE_URL in frontend/.env or the build environment.');
}

let parsedApiUrl;
try {
  parsedApiUrl = new URL(apiBaseUrl);
} catch {
  throw new Error('API_BASE_URL must be an absolute HTTP or HTTPS URL ending in /api.');
}
if (!['http:', 'https:'].includes(parsedApiUrl.protocol) || !parsedApiUrl.pathname.replace(/\/+$/, '').endsWith('/api')) {
  throw new Error('API_BASE_URL must be an absolute HTTP or HTTPS URL ending in /api.');
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });
fs.copyFileSync(path.join(frontendDirectory, 'index.html'), path.join(outputDirectory, 'index.html'));
fs.cpSync(path.join(frontendDirectory, 'static'), path.join(outputDirectory, 'static'), { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, 'config.js'),
  `window.CJ_CONFIG = Object.freeze({ apiBaseUrl: ${JSON.stringify(apiBaseUrl)} });\n`,
);

console.log(`Built frontend for ${parsedApiUrl.origin}${parsedApiUrl.pathname}.`);
