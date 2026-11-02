import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const staticExtensions = new Set(['.html', '.css', '.js', '.png', '.ico', '.txt', '.xml', '.webmanifest']);

if (path.dirname(dist) !== root || path.basename(dist) !== 'dist') {
  throw new Error('Refusing to build outside the OHGS project directory.');
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile() || !staticExtensions.has(path.extname(entry.name))) continue;
  fs.copyFileSync(path.join(root, entry.name), path.join(dist, entry.name));
}

// The simple GitHub package uses one `media` folder. The editable source uses
// `images`, `videos` and `assets`. Supporting both layouts prevents Vercel from
// silently publishing an old Vite bundle when an existing project still has
// `dist` configured as its output directory.
const mediaSource = path.join(root, 'media');
if (fs.existsSync(mediaSource)) {
  fs.cpSync(mediaSource, path.join(dist, 'media'), { recursive: true });
} else {
  const sourceFolders = ['images', 'videos', 'assets'];
  for (const folder of sourceFolders) {
    const source = path.join(root, folder);
    if (!fs.existsSync(source)) throw new Error(`Required deployment folder is missing: ${folder}`);
    fs.cpSync(source, path.join(dist, folder), { recursive: true });
  }
}

console.log('OHGS v41 static deployment created with continuous video playback, category browsing, quick loading feedback and persistent themes.');
