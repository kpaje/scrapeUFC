const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.ufc.com/athletes/all`);
    await page.waitForSelector("div.c-listing-athlete-flipcard__text__back");

    var news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(
        `div.c-listing-athlete-flipcard__text__back`
      );
      var athleteLink = document.querySelectorAll(`a.e-button--black `);
      var results = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        results[i] = {
          name: titleNodeList[i].innerText,
          url: athleteLink.getAttribute("href"),
        };
      }
      return results;
    });
    console.log(news);
    await browser.close();
    // Writing the news inside a json file
    // fs.writeFile("hackernews.json", JSON.stringify(news), function (err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
