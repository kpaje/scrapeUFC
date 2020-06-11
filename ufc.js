const puppeteer = require("puppeteer");
const {
  clickLinkSelector,
  verifyPages,
  requestPage,
  awaitPageURL,
} = require("./scrape.js");

function app(pagesToScrape) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let currentPage = 1;
      let urls = [];
      let site = "https://www.ufc.com/athletes/all";

      verifyPages(pagesToScrape);
      requestPage(page);
      awaitPageURL(page, site);

      while (currentPage <= pagesToScrape) {
        await page.waitForSelector("a.e-button--black ");
        let newUrls = await page.evaluate(() => {
          let results = [];
          let items = document.querySelectorAll("a.e-button--black ");
          items.forEach((item) => {
            results.push({
              url: item.getAttribute("href"),
              text: item.innerText,
            });
          });
          return results;
        });
        urls = urls.concat(newUrls);
        clickLinkSelector(currentPage, pagesToScrape, "a.e-button--black ");
        currentPage++;
      }
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}
app(1).then(console.log).catch(console.error);
