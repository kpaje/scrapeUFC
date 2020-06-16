const puppeteer = require("puppeteer");
const {
	clickLinkSelector,
	verifyPages,
	requestPage,
	awaitPageURL,
} = require("./scrape.js");
const { selectors } = require("./selectorQueries");
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
						let results = [];

						results = {
							nickname: athleteNickname[0].innerText,
							status: athleteStatus[0].innerText,
							hometown: athleteHometown[0].innerText,
							physical: athletePhysicalStats[0].innerText,
							wins: athleteWins[0].innerText,
							strikingAccuracy: athleteStrikingAccuracy[0].innerText,
							strikesLanded: athleteStrikesLanded[0].innerText,
						};
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
