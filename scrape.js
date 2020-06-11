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
  awaitMoreSelectors,
  verifyPages,
  requestPage,
  awaitPageURL,
};
