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

			// async function injectFunctions() {
			// 	await page.addScriptTag({
			// 		content: ` ${profile} ${record} ${striking}`,
			// 	});
			// }

			while (currentPage <= pagesToScrape) {
				// injectFunctions();
				let athleteProfile = await page.evaluate(
					({ selectors }) => {
						let results = {};
						// let results = { profile: {}, record: {}, striking: {} };

						for (const key in selectors) {
							const element = selectors[key];
							Object.assign(results, {
								[key]: document.querySelectorAll(element)[0].innerText,
							});
						}
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
