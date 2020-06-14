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
      let nameSelector = "span.c-listing-athlete__name";

      verifyPages(pagesToScrape);
      requestPage(page);
      // enter url in page
      awaitPageURL(page, site);
      await page.waitForSelector(nameSelector);

      while (currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(() => {
          let atheleteProfileSelector = "a.e-button--black ";
          let namesSelector = "span.c-listing-athlete__name";
          let results = [];

          let athleteName = document.querySelectorAll(namesSelector);
          let athleteProfiles = document.querySelectorAll(
            atheleteProfileSelector
          );

          athleteProfiles.forEach((profile) => {
            results.push({
              url: profile.getAttribute("href"),
            });
          });
          athleteName.forEach((name) => {
            results.push({
              name: name.innerText,
            });
          });

          return results;
        });
        urls = urls.concat(newUrls);
        clickLinkSelector(currentPage, pagesToScrape, nameSelector);
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
