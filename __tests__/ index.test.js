const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to your local server
  await page.goto('http://localhost:3000');

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Example test: Check if the page title contains 'Heart Fountain'
  const title = await page.title();
  if (title.includes('Heart Fountain')) {
    console.log('Page title test passed!');
  } else {
    console.error('Page title test failed!');
  }

  // You can add more tests here

  // Close the browser
  await browser.close();
})();
