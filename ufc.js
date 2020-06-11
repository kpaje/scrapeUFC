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
      // open the browser
      const browser = await puppeteer.launch();
      // open a new page
      const page = await browser.newPage();
      let currentPage = 1;
      let urls = [];
      let site = "https://www.ufc.com/athletes/all";

      verifyPages(pagesToScrape);
      requestPage(page);
      // enter url in page
      awaitPageURL(page, site);
      await page.waitForSelector("span.c-listing-athlete__name");

      while (currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(() => {
          let results = [];
          let items = document.querySelectorAll("a.e-button--black ");
          items.forEach((item) => {
            results.push({
              url: item.getAttribute("href"),
              text: item.innerText,
              name: name.innerText,
            });
          });

          return results;
        });
        urls = urls.concat(newUrls);
        clickLinkSelector(
          currentPage,
          pagesToScrape,
          "span.c-listing-athlete__name"
        );
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
