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
      let site = "https://www.ufc.com/athlete/israel-adesanya";
      //   let selector = "span.c-listing-athlete__name";
      let selector = "div.c-hero--full__content aos-init aos-animate";

      verifyPages(pagesToScrape);
      requestPage(page);
      // enter url in page
      awaitPageURL(page, site);
      await page.waitForSelector(selector);

      while (currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(() => {
          let athleteProfile = document.querySelectorAll("div.c-hero__header");
          let athleteName = document.querySelectorAll(
            "div.field field-name-nickname"
          );
          //   let weightclasses = document.querySelectorAll(
          //     "span.c-listing-athlete__title"
          //   );
          //   let records = document.querySelectorAll(
          //     "span.c-listing-athlete__record"
          //   );
          //   let nicknames = document.querySelectorAll(
          //     "span.c-listing-athlete__nickname"
          //   );
          //   let socialProfiles = document.querySelectorAll(
          //     "a.c-listing-athlete-flipcard__social-link"
          //   );
          let results = [];

          for (var i = 0; i < athleteProfile.length; i++) {
            results[i] = {
              name: athleteName[i].innerText,
              //   nickname: nicknames[i].innerText,
              //   profile: athleteProfiles[i].getAttribute("href"),
              //   record: records[i].innerText,
              //   weightclass: weightclasses[i].innerText,
              //   socialProfile: socialProfiles[i].getAttribute("href"),
            };
          }

          return results;
        });
        urls = urls.concat(newUrls);
        clickLinkSelector(currentPage, pagesToScrape, selector);
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
