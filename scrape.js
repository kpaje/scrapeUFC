async function clickLinkSelector(currentPage, pagesToScrape, selector) {
	if (currentPage < pagesToScrape) {
		await Promise.all([
			await page.waitForSelector(selector),
			await page.click(selector),
			await page.waitForSelector(selector),
		]);
	}
}

function verifyPages(pagesToScrape) {
	if (!pagesToScrape) {
		pagesToScrape = 1;
	}
}

async function requestPage(page) {
	await page.setRequestInterception(true);

	page.on("request", (request) => {
		if (request.resourceType() === "document") {
			request.continue();
		} else {
			request.abort();
		}
	});
}

async function awaitPageURL(page, site) {
	await page.goto(site);
}

// async function athleteObject(
// 	athleteNickname,
// 	athleteStatus,
// 	athleteHometown,
// 	athletePhysicalStats,
// 	athleteWins,
// 	athleteStrikingAccuracy,
// 	athleteStrikesLanded
// ) {
// 	let results = {
// 		nickname: athleteNickname[0].innerText,
// 		status: athleteStatus[0].innerText,
// 		hometown: athleteHometown[0].innerText,
// 		physical: athletePhysicalStats[0].innerText,
// 		wins: athleteWins[0].innerText,
// 		strikingAccuracy: athleteStrikingAccuracy[0].innerText,
// 		strikesLanded: athleteStrikesLanded[0].innerText,
// 	};
// 	return await results;
// }

module.exports = {
	clickLinkSelector,
	verifyPages,
	requestPage,
	awaitPageURL,
};
