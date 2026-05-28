import { chromium } from 'playwright';

const BASE = process.env.AGENT_URL || 'http://127.0.0.1:8050';

const mockResponse = {
  summary:
    'LangChain provides modular agent orchestration with tool routing, while LlamaIndex focuses on indexing and retrieval pipelines. For RAG-heavy research workflows, LlamaIndex is often faster to ship; LangChain is stronger for multi-step autonomous agents.',
  comparison:
    'LangChain: flexible agents, larger ecosystem, more boilerplate.\nLlamaIndex: excellent document indexing/query engines, simpler RAG setup.\nBest choice depends on whether your app is agent-first or retrieval-first.',
  sources: [
    'https://python.langchain.com/docs/',
    'https://docs.llamaindex.ai/',
    'https://github.com/langchain-ai/langchain',
  ],
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(800);
await page.screenshot({ path: 'public/agent-1.png', fullPage: false });
console.log('saved agent-1.png');

await page.fill('#query', 'Compare LangChain and LlamaIndex for RAG applications');
await page.screenshot({ path: 'public/agent-2.png', fullPage: false });
console.log('saved agent-2.png');

await page.route('**/ask**', (route) =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockResponse),
  }),
);

await page.click('#submit-button');
await page.waitForSelector('#results:not(.hidden)', { timeout: 10000 });
await page.waitForTimeout(600);
await page.screenshot({ path: 'public/agent-3.png', fullPage: false });
console.log('saved agent-3.png');

await browser.close();
