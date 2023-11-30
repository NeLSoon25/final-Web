import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';

const browserPath = 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe';
const resultsRoute = './src/tests/results/group-tests/movements';

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
    "movement page loads correctly": false,
    "delete one movement": false,
    "create a new movement": false,
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
  // document.querySelectorAll('div.sc-jOHGOj.eIKsKB a[href="/movements"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('div.sc-jOHGOj.eIKsKB a[href="/movements"]');
  await page.click('div.sc-jOHGOj.eIKsKB a[href="/movements"]');

  await navigationPromise;
  await page.waitForTimeout(2000);

  /* ---------------------------------------------------------------- */
  /* ----------------------------- delete --------------------------- */
  /* ---------------------------------------------------------------- */

  // verify if bot was blocked by supabase
  // document.querySelectorAll('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  const tableData = await page.$('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  if(!tableData) {
    // refresh page
    await page.reload();

    await navigationPromise;
    await page.waitForTimeout(2000);
  }

  tests["movement page loads correctly"] = true;
  await page.waitForTimeout(1000);

  // press delete category button
  // document.querySelectorAll('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  
  await page.waitForSelector('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  await takePicture();
  await page.click('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');

  // cancel delete category
  // document.querySelectorAll('div.swal2-actions button.swal2-cancel');
  await page.waitForTimeout(3000);
  await page.click('div.swal2-actions button.swal2-cancel');

  // press delete category button
  // document.querySelectorAll('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  await page.waitForTimeout(3000);
  await page.click('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  await page.waitForTimeout(2000);

  await takePicture();

  // delete category
  // document.querySelectorAll('div.swal2-actions button.swal2-confirm');
  await page.waitForTimeout(1000);
  await page.click('div.swal2-actions button.swal2-confirm');

  tests["delete one movement"] = true;

  /* ---------------------------------------------------------------- */
  /* ----------------------------- create --------------------------- */
  /* ---------------------------------------------------------------- */

  // open new income form
  // document.querySelectorAll('div.sc-iBAaJG.cUHftR');
  await page.waitForTimeout(3000);
  await page.click('div.sc-iBAaJG.cUHftR');

  // fill income form
  // income
  // document.querySelectorAll('input[type="number"]');
  await page.waitForTimeout(3000);
  await page.type('input[type="number"]', '999');
  // status
  // document.querySelectorAll('input.PrivateSwitchBase-input.MuiSwitch-input.css-1m9pwf3');
  await page.waitForTimeout(3000);
  await page.click('input.PrivateSwitchBase-input.MuiSwitch-input.css-1m9pwf3');
  // date
  // document.querySelectorAll('input[type=date]');
  await page.waitForTimeout(3000);
  await page.type('input[type="date"]', '2023-11-21');
  // description
  // document.querySelectorAll('input[type="text"]');
  await page.waitForTimeout(3000);
  await page.type('input[type="text"]', 'puppeteer');

  await takePicture();

  // save income
  // document.querySelectorAll('div.sub-container span.btn');
  await page.waitForTimeout(3000);
  await page.click('div.sub-container span.btn');
  await page.waitForTimeout(3000);

  tests["create a new movement"] = true;

  // verify if error window appeared
  // document.querySelectorAll('div[aria-labelledby="swal2-title"]');
  const insertErrorWindow = await page.$('div[aria-labelledby="swal2-title"]');
  if(insertErrorWindow) {
    console.log('error window appeared');

    // close error window
    // document.querySelectorAll('button.swal2-confirm.swal2-styled');
    await page.click('button.swal2-confirm.swal2-styled');
    await page.waitForTimeout(3000);
  }

  /* ---------------------------------------------------------------- */
  /* --------------------------- pagination ------------------------- */
  /* ---------------------------------------------------------------- */

  // go to next month
  // document.querySelectorAll('span.adelante');
  await page.waitForTimeout(3000);
  await page.click('span.adelante');

  await takePicture();

  // go to previous month
  // document.querySelectorAll('span.atras');
  await page.waitForTimeout(3000);
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
