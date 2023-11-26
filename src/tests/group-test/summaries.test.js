import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';

const browserPath = 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe';
const resultsRoute = './src/tests/results/group-tests/summaries';

function rpad(str) {
  const padding = Array(Math.max(0, 50 - str.length)).join(' ');
  return str + padding;
}

function lpad(str) {
  const padding = Array(Math.max(0, 10 - str.length )).join(' ');
  return padding + str;
}

function validateTests(tests) {
  console.log('');
  for (const [key, value] of Object.entries(tests)) {
    const result = value ? 'success' : 'failed';
    console.log(rpad(key), lpad(result));
  }
}

(async () => {
  const tests = {
    "user login": false,
    "summary page loads correctly": false,
    "lines bar displayed correctly": false,
    "tower bar displayed correctly": false,
    "pie bar displayed correctly": false,
    "bar buttons are working correctly": false,
    "pagination is working correctly": false,
    "switch type to filter movements": false,
    "user logout": false,
  }

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    product: 'firefox',
    headless: false,
  });
  
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  await fs.emptyDir(resultsRoute);
  let pictureCounter = 1;
  const takePicture = async () => {
    const pictureNumber = pictureCounter.toString().padStart(2, '0');
    pictureCounter++;
    await page.screenshot({ path: `${resultsRoute}/${pictureNumber}.png` });
  }

  /* ---------------------------------------------------------------- */
  /* ----------------------------- login ---------------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);

  // go to page
  await page.goto('http://localhost:5173/login');
  await navigationPromise;

  // close devtools
  // document.querySelectorAll('button[aria-label="Close React Query Devtools"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('button[aria-label="Close React Query Devtools"]');
  await page.click('button[aria-label="Close React Query Devtools"]');


  await page.waitForTimeout(2000);

  await takePicture();

  // click login
  // document.querySelectorAll('button[type="submit"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  await navigationPromise;

  await page.waitForTimeout(2000);

  tests["user login"] = true;

  /* ---------------------------------------------------------------- */
  /* --------------------------- home page -------------------------- */
  /* ---------------------------------------------------------------- */

  await takePicture();

  // go to movements
  // document.querySelectorAll('div.sc-jOHGOj.eIKsKB a[href="/informes"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('div.sc-jOHGOj.eIKsKB a[href="/informes"]');
  await page.click('div.sc-jOHGOj.eIKsKB a[href="/informes"]');

  await navigationPromise;
  await page.waitForTimeout(2000);

  await takePicture();

  tests["summary page loads correctly"] = true;

  /* ---------------------------------------------------------------- */
  /* ---------------------------- graphics -------------------------- */
  /* ---------------------------------------------------------------- */

  // lines bar
  // document.querySelectorAll('ul.tabs > :nth-child(2)');
  await page.waitForTimeout(3000);
  await page.click('ul.tabs > :nth-child(2)');

  await page.waitForTimeout(2000);

  await takePicture();

  tests["lines bar displayed correctly"] = true;

  // tower bar
  // document.querySelectorAll('ul.tabs > :nth-child(3)');
  await page.waitForTimeout(1000);
  await page.click('ul.tabs > :nth-child(3)');

  await page.waitForTimeout(2000);

  await takePicture();
  
  tests["tower bar displayed correctly"] = true;

  // pie bar
  // document.querySelectorAll('ul.tabs > :nth-child(1)');
  await page.waitForTimeout(1000);
  await page.click('ul.tabs > :nth-child(1)');

  await page.waitForTimeout(2000);

  await takePicture();

  tests["pie bar displayed correctly"] = true;

  tests["bar buttons are working correctly"] = true;

  /* ---------------------------------------------------------------- */
  /* --------------------------- pagination ------------------------- */
  /* ---------------------------------------------------------------- */

  // go to next month
  // document.querySelectorAll('span.adelante');
  await page.waitForTimeout(1000);
  await page.click('span.adelante');

  await page.waitForTimeout(2000);

  await takePicture();

  // go to previous month
  // document.querySelectorAll('span.atras');
  await page.waitForTimeout(1000);
  await page.click('span.atras');

  await takePicture();

  tests["pagination is working correctly"] = true;

  /* ---------------------------------------------------------------- */
  /* ---------------------------- swap type ------------------------- */
  /* ---------------------------------------------------------------- */

  // click on movement type
  // document.querySelectorAll('div.sc-gKHVLF.cwjzGU');
  await page.waitForTimeout(3000);
  await page.click('div.sc-gKHVLF.cwjzGU');

  // switch to expends
  // document.querySelectorAll('div.sc-eLSjS.jrIMCu > :first-child');
  await page.waitForTimeout(3000);
  await page.click('div.sc-eLSjS.jrIMCu > :first-child');

  await navigationPromise;

  await page.waitForTimeout(2000);

  await takePicture();

  tests["switch type to filter movements"] = true;

  /* ---------------------------------------------------------------- */
  /* ----------------------------- logout --------------------------- */
  /* ---------------------------------------------------------------- */

  // open user menu
  // document.querySelectorAll('div.sc-idyqAC.eIdhNS');
  await page.waitForTimeout(1000);
  await page.click('div.sc-idyqAC.eIdhNS');

  // logout
  // document.querySelectorAll('div.sc-kDnyCx.eZBHoV:last-child');
  await page.waitForTimeout(3000);
  await page.click('div.sc-kDnyCx.eZBHoV:last-child');

  await navigationPromise;

  await page.waitForTimeout(3000);

  tests["user logout"] = true;

  console.log(rpad('test'), lpad('result'));
  validateTests(tests);

  await browser.close();
})();
