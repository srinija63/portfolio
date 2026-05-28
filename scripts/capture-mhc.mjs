import { chromium } from 'playwright';

const BASE = process.env.MHC_URL || 'http://localhost:3030';

const mockUser = {
  user: {
    _id: 'demo-user',
    first_name: 'Srinija',
    last_name: 'Abburi',
    email: 'srinija@demo.com',
  },
};

const mockJournal = {
  entries: [
    {
      id: '1',
      entry: 'It felt okayish today. Took a walk and cleared my head.',
      mood_before: 'neutral',
      mood_after: 'positive',
      tags: ['self-care'],
      is_private: true,
      created_at: new Date().toISOString(),
      sentiment: 'neutral',
    },
    {
      id: '2',
      entry: 'Work was stressful but I finished my tasks.',
      mood_before: 'negative',
      mood_after: 'neutral',
      tags: ['work'],
      is_private: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      sentiment: 'positive',
    },
  ],
  pagination: { totalPages: 1, currentPage: 1, totalEntries: 2 },
};

const mockMoodAnalysis = {
  emotionDistribution: [
    { emotion: 'neutral', value: 47 },
    { emotion: 'positive', value: 29 },
    { emotion: 'negative', value: 18 },
    { emotion: 'crisis', value: 6 },
  ],
  dominant: { emotion: 'neutral', score: 0.4 },
  analyses: [
    { text: 'okayish day', sentiment: 'neutral' },
    { text: 'work stress', sentiment: 'negative' },
    { text: 'proud moment', sentiment: 'positive' },
    { text: 'good sleep', sentiment: 'positive' },
  ],
  emotionPatterns: [
    { emotion: 'joy', count: 12 },
    { emotion: 'calm', count: 9 },
    { emotion: 'anxiety', count: 6 },
  ],
};

const mockMoodCharts = {
  chartData: {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          data: [0.2, 0.4, -0.1, 0.5, 0.3],
          borderColor: '#3b82f6',
          backgroundColor: ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6'],
        },
      ],
    },
  },
  aiInsights: 'Your mood improved mid-week. Keep journaling consistently.',
};

async function setupMocks(page) {
  await page.addInitScript(() => {
    localStorage.setItem('token', 'portfolio-demo-token');
  });

  await page.route('**/api/auth/profile', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUser),
    }),
  );

  await page.route('**/api/journal/entries**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockJournal),
    }),
  );

  await page.route('**/api/mood/analysis**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockMoodAnalysis),
    }),
  );

  await page.route('**/api/mood/charts**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockMoodCharts),
    }),
  );

  await page.route('**/api/home**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ items: [] }),
    }),
  );
}

async function prepareHomeShot(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.bg-red-50, .bg-yellow-50').forEach((el) => el.remove());
  });
  const matrix = page.getByRole('heading', { name: 'Emotion Matrix' });
  await matrix.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
}

const shots = [
  ['mhc-1.png', '/'],
  ['mhc-2.png', '/journal'],
  ['mhc-3.png', '/mood'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await setupMocks(page);

for (const [file, route] of shots) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  if (route === '/') await prepareHomeShot(page);
  await page.screenshot({ path: `public/${file}`, fullPage: false });
  console.log('saved', file, route);
}

await browser.close();
