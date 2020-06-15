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

// function athleteObject(
//   results,
//   athleteProfiles,
//   athleteNames,
//   nicknames,
//   athleteProfiles,
//   records,
//   weightclasses,
//   socialProfiles
// ) {
//   for (var i = 0; i < athleteProfiles.length; i++) {
//     results[i] = {
//       name: athleteNames[i].innerText,
//       nickname: nicknames[i].innerText,
//       profile: athleteProfiles[i].getAttribute("href"),
//       record: records[i].innerText,
//       weightclass: weightclasses[i].innerText,
//       socialProfile: socialProfiles[i].getAttribute("href"),
//     };
//   }
//   return results;
// }

module.exports = {
  clickLinkSelector,
  verifyPages,
  requestPage,
  awaitPageURL,
};
