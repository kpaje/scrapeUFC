const puppeteer = require("puppeteer");

function ifDocument(request) {
	if (request.resourceType() === "document") {
		request.continue();
	} else {
		request.abort();
	}
}

async function awaitMoreSelectors(currentPage, pagesToScrape) {
	if (currentPage < pagesToScrape) {
		await Promise.all([
			await page.waitForSelector("a.morelink"),
			await page.click("a.morelink"),
			await page.waitForSelector("a.storylink"),
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
		ifDocument(request);
	});
}

async function awaitPageURL(page) {
	await page.goto("https://news.ycombinator.com/");
}

function res() {
	let results = [];
	let items = document.querySelectorAll("a.storylink");

	items.forEach((item) => {
		results.push({
			url: item.getAttribute("href"),
			text: item.innerText,
		});
	});
	return results;
}

function app(pagesToScrape) {
	return new Promise(async (resolve, reject) => {
		try {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			let currentPage = 1;
			let urls = [];

			verifyPages(pagesToScrape);
			requestPage(page);
			awaitPageURL(page);

			while (currentPage <= pagesToScrape) {
				await page.waitForSelector("a.storylink");
				let newUrls = await page.evaluate(() => {
					let results = [];
					let items = document.querySelectorAll("a.storylink");
					items.forEach((item) => {
						results.push({
							url: item.getAttribute("href"),
							text: item.innerText,
						});
					});
					return results;
				});
				urls = urls.concat(newUrls);
				awaitMoreSelectors(currentPage, pagesToScrape);
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
