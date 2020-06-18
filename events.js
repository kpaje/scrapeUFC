const puppeteer = require("puppeteer");
const {
  clickLinkSelector,
  verifyPages,
  requestPage,
  awaitPageURL,
} = require("./scrape.js");
// const { selectors } = require("./selectors");
let currentPage = 1;
let atheleteObject = [];
let site = "https://www.ufc.com/events";
let mainSelector = "div.details-wrapper";

function app(pagesToScrape) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      verifyPages(pagesToScrape);
      requestPage(page);
      awaitPageURL(page, site);
      await page.waitForSelector(mainSelector);

      while (currentPage <= pagesToScrape) {
        let athleteProfile = await page.evaluate(() => {
          //   ({ selectors }) => {
          let headliners = "h3.c-card-event--result__headline";
          //   let date = "div.data-main-card";

          const selectors = {
            headliners,
            // date,
          };
          let results = {};

          for (const names in selectors) {
            const item = selectors[names];
            Object.assign(results, {
              [names]: document.querySelectorAll(item)[0].innerText,
            });
          }
          return results;
        });
        atheleteObject = atheleteObject.concat(athleteProfile);
        clickLinkSelector(currentPage, pagesToScrape, mainSelector);
        currentPage++;
      }
      browser.close();
      return resolve(atheleteObject);
    } catch (e) {
      return reject(e);
    }
  });
}
app(1).then(console.log).catch(console.error);
