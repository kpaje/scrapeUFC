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
// let siteRoster = "https://www.ufc.com/athletes/all";
// let selectorRoster = "span.c-listing-athlete__name";

// let athleteProfiles = document.querySelectorAll("a.e-button--black ");
// let athleteNames = document.querySelectorAll("span.c-listing-athlete__name");
// let weightclasses = document.querySelectorAll("span.c-listing-athlete__title");
// let records = document.querySelectorAll("span.c-listing-athlete__record");
// let nicknames = document.querySelectorAll("span.c-listing-athlete__nickname");
// let socialProfiles = document.querySelectorAll(
// 	"a.c-listing-athlete-flipcard__social-link"
// );

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
// let siteEvents = "https://www.ufc.com/events";
// let mainSelectorEvents = "div.details-wrapper";

// let headliners = "h3.c-card-event--result__headline";
//   let date = "div.data-main-card";
