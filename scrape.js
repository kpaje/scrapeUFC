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

module.exports = {
	clickLinkSelector,
	verifyPages,
	requestPage,
	awaitPageURL,
};
