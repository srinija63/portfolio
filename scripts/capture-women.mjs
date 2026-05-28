import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, 'women-previews');

const shots = [
  ['women-sec-1.png', 'login.html'],
  ['women-sec-2.png', 'home.html'],
  ['women-sec-3.png', 'alarm.html'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [file, html] of shots) {
  await page.goto(`file:///${path.join(baseDir, html).replace(/\\/g, '/')}`, {
    waitUntil: 'load',
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `public/${file}`, fullPage: false });
  console.log('saved', file);
}

await browser.close();
