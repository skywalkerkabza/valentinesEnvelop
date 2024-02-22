const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/');

  // Test case 1: Verify the presence of header elements
  await page.waitForSelector('header');
  await page.waitForSelector('header .logo');
  await page.waitForSelector('header .navigation');
  await page.waitForSelector('header .navigation li');

  // Test case 2: Verify the presence of parallax section elements
  await page.waitForSelector('.parallax');
  await page.waitForSelector('#title');
  await page.waitForSelector('#bottom');
  await page.waitForSelector('#woman');
  await page.waitForSelector('#leftplant');
  await page.waitForSelector('#rightplant');
  await page.waitForSelector('#ball');
  await page.waitForSelector('#lifebuoy');

  // Test case 3: Verify the presence of blog section elements
  await page.waitForSelector('.blog');
  await page.waitForSelector('.blog h2');
  await page.waitForSelector('.blog p');
  await page.waitForSelector('.blog .cards');
  await page.waitForSelector('.blog .card');

  // Test case 4: Verify the content of cards
  const cards = await page.$$('.blog .card');
  for (const card of cards) {
    const title = await card.$eval('h3', el => el.textContent);
    const description = await card.$eval('p', el => el.textContent);
    console.log('Title:', title);
    console.log('Description:', description);
  }

  // Test case 5: Test the functionality of script.js
  // This test will depend on the specific functionality implemented in script.js
  // You can write additional test cases to cover the functionality of script.js

  // Test case 6: Test navigation links
  await Promise.all([
    page.click('header .navigation li:nth-child(2) a'), // Click on "About"
    page.waitForNavigation(),
  ]);
  console.log('Navigated to About page.');

  // Test case 7: Test if images are loaded
  const images = await page.$$('img');
  for (const image of images) {
    const src = await image.getAttribute('src');
    if (src) {
      console.log('Image loaded:', src);
    } else {
      console.log('Image source not found');
    }
  }

  // Add more test cases as needed

  await browser.close();
})();
