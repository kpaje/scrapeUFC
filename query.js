const { Athlete } = require("./class");
const { selectors } = require("./selectors");

// INDIVIDUAL ATHLETE
let site = "https://www.ufc.com/athlete/israel-adesanya";
let mainSelector = "div.c-hero--full__container";
let pagesToScrape = 1;

var createAdesanya = new Athlete(
	selectors.individual,
	pagesToScrape,
	site,
	mainSelector
).scrape();
createAdesanya;

//ROSTER
let siteRoster = "https://www.ufc.com/athletes/all";
let selectorRoster = "span.c-listing-athlete__name";
let athleteProfiles = "a.e-button--black ";

var getRoster = new Athlete(
	selectors.roster,
	pagesToScrape,
	siteRoster,
	athleteProfiles
).scrape();
getRoster;

// for (var i = 0; i < athleteProfiles.length; i++) {
//     results[i] = {
//       name: athleteNames[i].innerText,
//       nickname: nicknames[i].innerText,
//       profile: athleteProfiles[i].getAttribute("href"),
//       record: records[i].innerText,
//       weightclass: weightclasses[i].innerText,
//       socialProfile: socialProfiles[i].getAttribute("href"),
//     };
//   }

//EVENTS
let siteEvents = "https://www.ufc.com/events";
let mainSelectorEvents = "div.details-wrapper";

var getRoster = new Athlete(
	selectors.event,
	pagesToScrape,
	siteEvents,
	mainSelectorEvents
).scrape();
getRoster;

//   let date = "div.data-main-card";
