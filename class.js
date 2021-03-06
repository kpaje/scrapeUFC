const puppeteer = require("puppeteer");
const {
  clickLinkSelector,
  verifyPages,
  requestPage,
  awaitPageURL,
} = require("./helpers.js");

async function functionToInject() {
  return await (1 + 1);
}

class Athlete {
  constructor(selectors, site, mainSelector) {
    this.selectors = selectors;
    this.site = site;
    this.mainSelector = mainSelector;
  }

  scrape() {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let atheleteObject = [];
        let currentPage = 1;
        let pagesToScrape = 1;
        let selectors = this.selectors;

        verifyPages(pagesToScrape);
        requestPage(page);
        awaitPageURL(page, this.site);
        await page.waitForSelector(this.mainSelector);

        while (currentPage <= pagesToScrape) {
          await page.evaluate(() => {
            window.pushSelectors = function (selectors, results) {
              for (const names in selectors) {
                const item = selectors[names];
                Object.assign(results, {
                  [names]: document.querySelectorAll(item)[0].innerText,
                });
              }
            };
          });
          //   await page.addScriptTag({ content: `${functionToInject} ` });
          //   await page.exposeFunction("functionToInject", functionToInject);
          let athleteProfile = await page.evaluate(
            ({ selectors }) => {
              let results = {};
              pushSelectors(selectors, results);
              return results;
            },
            { selectors }
          );
          atheleteObject = atheleteObject.concat(athleteProfile);
          clickLinkSelector(currentPage, pagesToScrape, this.mainSelector);
          currentPage++;
        }
        browser.close();
        return resolve(atheleteObject);
      } catch (e) {
        return reject(e);
      }
    })
      .then(console.log)
      .catch(console.error);
  }
}

module.exports = { Athlete };
