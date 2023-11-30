import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';

const browserPath = 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe';
const resultsRoute = './src/tests/results/group-tests/categories';

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
    "category page loads correctly": false,
    "delete one category": false,
    "create a new category": false,
    "update one category": false,
    "pagination is working correctly": false,
    "switch type to filter categories": false,
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

  tests["user login"] = true;

  await page.waitForTimeout(2000);

  /* ---------------------------------------------------------------- */
  /* --------------------------- home page -------------------------- */
  /* ---------------------------------------------------------------- */

  await takePicture();

  // go to categories
  // document.querySelectorAll('div.sc-jOHGOj.eIKsKB a[href="/categories"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('div.sc-jOHGOj.eIKsKB a[href="/categories"]');
  await page.click('div.sc-jOHGOj.eIKsKB a[href="/categories"]');

  await navigationPromise;
  await page.waitForTimeout(2000);

  await takePicture();

  tests["category page loads correctly"] = true;

  /* ---------------------------------------------------------------- */
  /* ----------------------------- delete --------------------------- */
  /* ---------------------------------------------------------------- */

  // press delete category button
  // document.querySelectorAll('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
  await page.waitForTimeout(1000);
  await page.waitForSelector('table.responsive-table tbody tr:first-child span.sc-AOXSc.bzpUlt');
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

  /* ---------------------------------------------------------------- */
  /* ----------------------------- create --------------------------- */
  /* ---------------------------------------------------------------- */

  // open new category menu
  // document.querySelectorAll('div.sc-iBAaJG.cUHftR');
  await page.waitForTimeout(3000);

  tests["delete one category"] = true;

  await page.click('div.sc-iBAaJG.cUHftR');

  // input "puppeteer"
  // document.querySelectorAll('input[type="text"]');
  await page.waitForTimeout(3000);
  await page.type('input[type="text"]', 'puppeteer');

  await takePicture();

  // save new category
  // document.querySelectorAll('div.sub-container span.btn');
  await page.waitForTimeout(3000);
  await page.click('div.sub-container span.btn');
  await page.waitForTimeout(3000);

  tests["create a new category"] = true;

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
  /* ------------------------------ edit ---------------------------- */
  /* ---------------------------------------------------------------- */

  // click edit category
  // document.querySelectorAll('table.responsive-table tbody tr:first-child span.sc-AOXSc.hZtAbu');
  const editButton = await page.$('table.responsive-table tbody tr:first-child span.sc-AOXSc.hZtAbu');
  if(!editButton) {
    // if puppeteer bot read was blocked, reload page to continue test
    console.log('bot was blocked by supabase, reloading page to fetch data again');
    await page.reload();
    await navigationPromise;
    await page.waitForSelector('table.responsive-table tbody tr:first-child span.sc-AOXSc.hZtAbu');
  }
  await page.click('table.responsive-table tbody tr:first-child span.sc-AOXSc.hZtAbu');

  // input "edited"
  // document.querySelectorAll('div.sub-container div.sc-ezGUZh.cXYtQj input[type="text"]');
  await page.waitForTimeout(3000);
  await page.type('div.sub-container div.sc-ezGUZh.cXYtQj input[type="text"]', ' edited');

  await takePicture();

  // save edited category
  // document.querySelectorAll('div.sub-container span.btn');
  await page.waitForTimeout(3000);
  await page.click('div.sub-container span.btn');

  /* ---------------------------------------------------------------- */
  /* --------------------------- pagination ------------------------- */
  /* ---------------------------------------------------------------- */

  // go to next page
  // document.querySelectorAll('div.sc-hTJqdO.ivKYDp > :last-child');
  await page.waitForTimeout(3000);
  tests["update one category"] = true;
  await page.click('div.sc-hTJqdO.ivKYDp > :last-child');

  await takePicture();

  // go to previous page
  // document.querySelectorAll('div.sc-hTJqdO.ivKYDp > :nth-child(2)');
  await page.waitForTimeout(3000);
  await page.click('div.sc-hTJqdO.ivKYDp > :nth-child(2)');

  await takePicture();

  tests["pagination is working correctly"] = true;

  /* ---------------------------------------------------------------- */
  /* ---------------------------- swap type ------------------------- */
  /* ---------------------------------------------------------------- */

  // open category type option
  // document.querySelectorAll('div.sc-gKHVLF.cwjzGU');
  await page.waitForTimeout(3000);
  await page.click('div.sc-gKHVLF.cwjzGU');

  // switch category
  // document.querySelectorAll('div.sc-eLSjS.jrIMCu > :first-child');
  await page.waitForTimeout(3000);
  await page.click('div.sc-eLSjS.jrIMCu > :first-child');

  await navigationPromise;

  await page.waitForTimeout(2000);

  await takePicture();

  tests["switch type to filter categories"] = true;

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

  tests["user logout"] = true;

  await page.waitForTimeout(3000);

  console.log(rpad('test'), lpad('result'));
  validateTests(tests);

  await browser.close();
})();
