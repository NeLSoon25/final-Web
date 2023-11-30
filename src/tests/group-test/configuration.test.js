import puppeteer from 'puppeteer-core';
import fs from 'fs-extra';

const browserPath = 'C:\\Program Files\\Firefox Developer Edition\\firefox.exe';
const resultsRoute = './src/tests/results/group-tests/configuration';

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
    "configuration page loads correctly": false,
    "change currency selection": false,
    "change page theme": false,
    "update user preferences": false,
    "account reset": false,
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

  // go to movements
  // document.querySelectorAll('div.sc-jOHGOj.eIKsKB a[href="/configuration"]')
  await page.waitForTimeout(1000);
  await page.waitForSelector('div.sc-jOHGOj.eIKsKB a[href="/configuration"]');
  await page.click('div.sc-jOHGOj.eIKsKB a[href="/configuration"]');

  await navigationPromise;
  await page.waitForTimeout(2000);

  tests["configuration page loads correctly"] = true;

  await takePicture();

  /* ---------------------------------------------------------------- */
  /* ---------------------- japan currency change ------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // open currency menu
  // document.querySelectorAll('section.area2 > :nth-child(2)');
  await page.click('section.area2 > :nth-child(2)');
  await page.waitForTimeout(3000);

  // search currency for japan
  // document.querySelectorAll('input[placeholder="Buscar..."]');
  await page.type('input[placeholder="Buscar..."]', 'japan');
  await page.waitForTimeout(3000);

  // select currency
  // document.querySelectorAll('section.sc-hHvkSs.kowLnM');
  await page.click('section.sc-hHvkSs.kowLnM');

  await page.waitForTimeout(2000);

  await takePicture();

  /* ---------------------------------------------------------------- */
  /* ---------------------- mexico currency change ------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // open currency menu
  // document.querySelectorAll('section.area2 > :nth-child(2)');
  await page.click('section.area2 > :nth-child(2)');
  await page.waitForTimeout(3000);

  // search currency for mexico
  // document.querySelectorAll('input[placeholder="Buscar..."]');
  await page.type('input[placeholder="Buscar..."]', 'mexico');
  await page.waitForTimeout(3000);

  // select currency
  // document.querySelectorAll('section.sc-hHvkSs.kowLnM');
  await page.click('section.sc-hHvkSs.kowLnM');

  await page.waitForTimeout(2000);

  await takePicture();

  tests["change currency selection"] = true;

  /* ---------------------------------------------------------------- */
  /* ----------------------- light theme change --------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // open theme menu
  // document.querySelectorAll('section.area2 > :nth-child(3)');
  await page.click('section.area2 > :nth-child(3)');
  await page.waitForTimeout(3000);

  // select light theme
  // document.querySelectorAll('section.contentItems > :first-child');
  await page.click('section.contentItems > :first-child');

  await page.waitForTimeout(2000);

  await takePicture();

  /* ---------------------------------------------------------------- */
  /* ------------------------ dark theme change --------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // open theme menu
  // document.querySelectorAll('section.area2 > :nth-child(3)');
  await page.click('section.area2 > :nth-child(3)');
  await page.waitForTimeout(3000);

  // select last theme
  // document.querySelectorAll('section.contentItems > :last-child');
  await page.click('section.contentItems > :last-child');

  await page.waitForTimeout(2000);

  await takePicture();

  tests["change page theme"] = true;

  /* ---------------------------------------------------------------- */
  /* -------------------------- save changes ------------------------ */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // click save button
  // document.querySelectorAll('button[bgcolor="#BF94FF"] span.btn');
  await page.click('button[bgcolor="#BF94FF"] span.btn');

  await page.waitForTimeout(2000);

  await takePicture();

  tests["update user preferences"] = true;

  /* ---------------------------------------------------------------- */
  /* -------------------------- reset account ----------------------- */
  /* ---------------------------------------------------------------- */

  await page.waitForTimeout(1000);
  // click the reset button
  // document.querySelectorAll('button[bgcolor="rgba(247, 92, 92, 0.87)"] span.btn');
  await page.click('button[bgcolor="rgba(247, 92, 92, 0.87)"] span.btn');

  await page.waitForTimeout(2000);

  await takePicture();

  // cancel action
  // document.querySelectorAll('div.swal2-actions button.swal2-cancel');
  await page.waitForTimeout(1000);
  await page.click('div.swal2-actions button.swal2-cancel');

  tests["account reset"] = true;

  /* ---------------------------------------------------------------- */
  /* ----------------------------- logout --------------------------- */
  /* ---------------------------------------------------------------- */

  // open user menu
  // document.querySelectorAll('div.sc-idyqAC.eIdhNS');
  await page.waitForTimeout(3000);
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
