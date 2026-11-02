import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const release = 'v41-visible-video-autoplay';
const phone = '255689528193';
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html')).sort();
const publicFiles = htmlFiles.filter((name) => name !== 'deploy-test.html');
const errors = [];
const titles = new Set();
const canonicals = new Set();
const languageController = fs.readFileSync(path.join(root, 'ohgs-pro-stable-launch.js'), 'utf8');
const translations=vm.runInNewContext('('+languageController.match(/var SW_TEXT=(\{[\s\S]*?\});/)[1]+')');
let imageCount = 0;
let videoCount = 0;
let bilingualCount = 0;

function count(value, expression) {
  return (value.match(expression) || []).length;
}

function localTarget(raw) {
  if (!raw || /^(?:https?:|mailto:|tel:|data:|#)/i.test(raw)) return null;
  const clean = raw.split(/[?#]/)[0];
  if (!clean || clean === '/') return 'index.html';
  return clean.replace(/^\//, '');
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const isPublic = file !== 'deploy-test.html';
  if (/data:image\//i.test(html)) errors.push(`${file}: embedded base64 image found`);
  if (Buffer.byteLength(html) > 100_000) errors.push(`${file}: HTML is larger than 100 KB`);
  if (!html.includes(release)) errors.push(`${file}: release marker missing`);
  if (/ohgs-fast-delivery-motorbike/i.test(html)) errors.push(`${file}: unprofessional status-screen image is still referenced`);
  if (/href=["'](?:#|javascript:[^"']*)["']/i.test(html)) errors.push(`${file}: empty or JavaScript link found`);

  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter((value) => value === id).length > 1) errors.push(`${file}: duplicate id ${id}`);
  }

  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const attrs = match[1];
    if (/\btarget="_blank"/i.test(attrs) && !/\brel="[^"]*noopener/i.test(attrs)) {
      errors.push(`${file}: target=_blank link missing rel=noopener`);
    }
    const href = (attrs.match(/\bhref="([^"]+)"/i) || [])[1] || '';
    if (/wa\.me\//i.test(href) && !href.includes(phone)) errors.push(`${file}: incorrect WhatsApp number`);
  }

  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
  if (!title) errors.push(`${file}: title missing`);
  if (isPublic && title) {
    const browserTitle = title.replaceAll('&amp;', '&');
    if (titles.has(browserTitle)) errors.push(`${file}: duplicate title ${browserTitle}`);
    titles.add(browserTitle);
    if (!translations[browserTitle]) errors.push(`${file}: Kiswahili browser-tab title missing`);
  }

  if (isPublic) {
    if(count(html,/rel="stylesheet"/g)!==1||!html.includes('ohgs-site.css?v='+release))errors.push(`${file}: expected one current design stylesheet`);
    if(!html.includes('ohgs-mobile-media.js?v='+release)||html.includes('ohgs-premium-design.js'))errors.push(`${file}: current mobile media controller missing`);
    if(/<style\b/i.test(html))errors.push(`${file}: conflicting inline stylesheet found`);
    if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/i.test(html)) errors.push(`${file}: responsive viewport missing`);
    if (!/<html lang="en"/i.test(html)) errors.push(`${file}: document language missing`);
    if (count(html, /<h1\b/gi) !== 1) errors.push(`${file}: expected exactly one H1`);
    if (count(html, /<section class="order-path"/gi) !== 1) errors.push(`${file}: expected one quick-order section`);
    if (count(html, /<nav class="mobile-order-dock"/gi) !== 1) errors.push(`${file}: expected one mobile order dock`);
    if (!html.includes(`tel:+${phone}`)) errors.push(`${file}: OHGS call action missing`);
    if (!/data-en="Check stock on WhatsApp"\s+data-sw="Thibitisha stok WhatsApp"/i.test(html)) errors.push(`${file}: bilingual stock action missing`);
    if (html.indexOf('class="order-path"') < html.indexOf('<section')) errors.push(`${file}: quick-order section is not after page content starts`);

    for (const pattern of [
      /<meta name="description" content="[^"]+">/i,
      /<meta name="robots" content="index,follow/i,
      /<link rel="canonical" href="https:\/\/ohgs\.co\.tz[^\"]*">/i,
      /<meta property="og:title" content="[^"]+">/i,
      /<meta property="og:description" content="[^"]+">/i,
      /<meta property="og:url" content="https:\/\/ohgs\.co\.tz[^\"]*">/i,
      /<meta name="twitter:card" content="summary_large_image">/i,
      /<script type="application\/ld\+json">/i
    ]) if (!pattern.test(html)) errors.push(`${file}: SEO field missing (${pattern})`);

    const canonical = (html.match(/<link rel="canonical" href="([^"]+)">/i) || [])[1];
    if (canonical) {
      if (canonicals.has(canonical)) errors.push(`${file}: duplicate canonical ${canonical}`);
      canonicals.add(canonical);
    }

    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try { JSON.parse(match[1]); } catch { errors.push(`${file}: invalid JSON-LD`); }
    }
  } else if (!/noindex,nofollow/i.test(html)) {
    errors.push('deploy-test.html: noindex missing');
  }

  const pageImages = [];
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    imageCount += 1;
    if (!/\balt="[^"]*"/i.test(match[1])) errors.push(`${file}: image alt missing`);
    const src = (match[1].match(/\bsrc="([^"]+)"/i) || [])[1];
    if(src&&src.endsWith('.webp')&&!/\bsrcset="/.test(match[1]))errors.push(`${file}: responsive image sources missing`);
    for(const list of match[1].matchAll(/srcset="([^"]+)"/g))for(const item of list[1].split(',')){const asset=item.trim().split(' ')[0];if(!fs.existsSync(asset))errors.push(`${file}: missing responsive asset ${asset}`);}
    if (src && !src.includes('ohgs-header-pro-badge')) pageImages.push(src);
  }
  for (const src of new Set(pageImages)) {
    if (pageImages.filter((value) => value === src).length > 1) errors.push(`${file}: repeated content image ${src}`);
  }

  for (const match of html.matchAll(/<video\b([^>]*)>/gi)) {
    videoCount += 1;
    if (!/\b(?:data-)?poster="[^"]+"/i.test(match[1])) errors.push(`${file}: video poster missing`);
    if (!/\bpreload="(?:none|metadata)"/i.test(match[1])) errors.push(`${file}: video preload is too aggressive`);
    if (/\bautoplay\b/i.test(match[1])) errors.push(`${file}: autoplay video found`);
    if(!/\bdata-video-src="/.test(match[1])||!/\bdata-mobile-src="/.test(match[1]))errors.push(`${file}: mobile/on-demand video source missing`);
    for(const asset of match[1].matchAll(/data-(?:mobile|video)-src="([^"]+)"/g))if(!fs.existsSync(asset[1]))errors.push(`${file}: missing video ${asset[1]}`);
  }

  const englishCount = count(html, /\bdata-en=/g);
  const swahiliCount = count(html, /\bdata-sw=/g);
  bilingualCount += englishCount;
  if (englishCount !== swahiliCount) errors.push(`${file}: English/Kiswahili attribute count differs`);

  for (const match of html.matchAll(/\b(?:src|href|poster)="([^"]+)"/gi)) {
    const target = localTarget(match[1]);
    if (!target) continue;
    if (!fs.existsSync(path.join(root, target))) errors.push(`${file}: missing local reference ${target}`);
    else if(fs.statSync(path.join(root,target)).isFile()&&fs.statSync(path.join(root,target)).size===0)errors.push(`${file}: empty local asset ${target}`);
  }
}

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const homeProducts = home.indexOf('class="grid products-grid"');
const homeCampaign = home.indexOf('home-construction-campaign');
if (homeProducts < 0 || homeCampaign < 0 || homeProducts > homeCampaign) errors.push('index.html: products must appear before the campaign gallery');
if (count(home, /<video\b/gi) !== 7) errors.push('index.html: expected seven home video placements');
for(const file of ['index.html','gallery.html','services.html','projects.html','construction-materials.html','product-construction-supply.html'])if(!fs.readFileSync(file,'utf8').includes('data-video-src="media/ohgs-build-with-us.mp4"'))errors.push(`${file}: uploaded video missing`);

const products = fs.readFileSync(path.join(root, 'products.html'), 'utf8');
if (products.indexOf('id="product-catalog"') > products.indexOf('video-showcase-products')) errors.push('products.html: product grid must appear before video showcase');

const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
for (const required of ['name="name"', 'name="phone"', 'name="message"', 'name="website"', 'role="status"', 'aria-live="polite"']) {
  if (!contact.includes(required)) errors.push(`contact.html: missing ${required}`);
}

const notifyClient = fs.readFileSync(path.join(root, 'ohgs-email-notifications.js'), 'utf8');
if (!/return response\.ok/.test(notifyClient) || !/sent \? successText : errorText/.test(notifyClient)) {
  errors.push('contact form: success and failure responses are not handled separately');
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const canonical of canonicals) if (!sitemap.includes(`<loc>${canonical}</loc>`)) errors.push(`sitemap: missing ${canonical}`);
if (/deploy-test/.test(sitemap)) errors.push('sitemap: deploy-test must not be indexed');
if (!fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('https://ohgs.co.tz/sitemap.xml')) errors.push('robots.txt: sitemap missing');

if (errors.length) {
  console.error(`QA failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Deep QA passed: ${htmlFiles.length} pages (${publicFiles.length} public), ${imageCount} images, ${videoCount} video placements, ${bilingualCount} bilingual text entries, ${canonicals.size} unique canonical URLs, customer ordering and enquiry handling verified.`);
