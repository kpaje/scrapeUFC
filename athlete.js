const puppeteer = require("puppeteer");
const {
  clickLinkSelector,
  verifyPages,
  requestPage,
  awaitPageURL,
} = require("./scrape.js");
const { selectors } = require("./selectors");
const { profile, record, striking } = require("./objectAssigns");
let currentPage = 1;
let atheleteObject = [];
let site = "https://www.ufc.com/athlete/israel-adesanya";
let mainSelector = "div.c-hero--full__container";

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
        //inject functions
        await page.addScriptTag({
          content: ` ${profile} ${record} ${striking}`,
        });
        //end inject functions
        let athleteProfile = await page.evaluate(
          ({ selectors }) => {
            let athleteNickname = document.querySelectorAll(selectors.nickname);
            let athleteStatus = document.querySelectorAll(selectors.status);
            let athleteHometown = document.querySelectorAll(selectors.hometown);
            let athletePhysicalStats = document.querySelectorAll(
              selectors.physicalStats
            );
            let athleteWins = document.querySelectorAll(selectors.wins);
            let athleteStrikingAccuracy = document.querySelectorAll(
              selectors.strikingAccuracy
            );
            let athleteStrikesLanded = document.querySelectorAll(
              selectors.strikesLanded
            );
            let results = { profile: {}, record: {}, striking: {} };

            //functions injected
            profile(
              results,
              athleteNickname,
              athleteStatus,
              athleteHometown,
              athletePhysicalStats
            );
            record(results, athleteWins);
            striking(results, athleteStrikingAccuracy, athleteStrikesLanded);
            //end functions injected
            return results;
          },
          { selectors }
        );
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
