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
      let selector = "div.c-hero--full__container";

      verifyPages(pagesToScrape);
      requestPage(page);
      // enter url in page
      awaitPageURL(page, site);
      await page.waitForSelector(selector);

      while (currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(() => {
          //   let athleteProfile = document.querySelectorAll(
          //     "div.c-hero--full__headline-prefix"
          //   );
          let athleteWins = document.querySelectorAll(
            "div.c-record__promoted-figure"
          );
          let athleteStrikingAccuracy = document.querySelectorAll(
            "div.e-chart-circle__wrapper"
          );
          let athleteStrikesLanded = document.querySelectorAll(
            "dd.c-overlap__stats-value"
          );
          //   let athleteStrikesAttempted = document.querySelectorAll(
          //     "dd.c-overlap__stats-value"
          //   );
          let athleteNickname = document.querySelectorAll(
            "div.c-hero--full__headline-prefix"
          );
          let athleteStatus = document.querySelectorAll("div.c-bio__row--1col");
          let athleteHometown = document.querySelectorAll(
            "div.c-bio__row--2col"
          );
          let athletePhysicalStats = document.querySelectorAll(
            "div.c-bio__row--3col"
          );

          let results = [];

          results = {
            nickname: athleteNickname[0].innerText,
            status: athleteStatus[0].innerText,
            hometown: athleteHometown[0].innerText,
            physical: athletePhysicalStats[0].innerText,
            wins: athleteWins[0].innerText,
            strikingAccuracy: athleteStrikingAccuracy[0].innerText,
            strikesLanded: athleteStrikesLanded[0].innerText,
            // strikesAttempted: athleteStrikesAttempted[0].innerText,
            strikesLanded: athleteStrikesLanded[0].innerText,
          };

          //   for (var i = 0; i < athleteProfile.length; i++) {
          //     results[i] = {
          //       //   name: athleteName[i].innerText,
          //       nickname: athleteNickname[i].innerText,
          //     };
          //   }

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
