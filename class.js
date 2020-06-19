const puppeteer = require("puppeteer");
const {
	clickLinkSelector,
	verifyPages,
	requestPage,
	awaitPageURL,
} = require("./scrape.js");
const { selectors } = require("./selectors");

class Athlete {
	constructor(pagesToScrape, site, mainSelector) {
		this.pagesToScrape = pagesToScrape;
		this.site = site;
		this.mainSelector = mainSelector;
	}

	scraper() {
		return new Promise(async (resolve, reject) => {
			try {
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				let atheleteObject = [];
				let currentPage = 1;

				verifyPages(this.pagesToScrape);
				requestPage(page);
				awaitPageURL(page, this.site);
				await page.waitForSelector(this.mainSelector);

				while (currentPage <= this.pagesToScrape) {
					let athleteProfile = await page.evaluate(
						({ selectors }) => {
							let results = {};

							for (const names in selectors) {
								const item = selectors[names];
								Object.assign(results, {
									[names]: document.querySelectorAll(item)[0].innerText,
								});
							}
							return results;
						},
						{ selectors }
					);
					atheleteObject = atheleteObject.concat(athleteProfile);
					clickLinkSelector(currentPage, this.pagesToScrape, this.mainSelector);
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
