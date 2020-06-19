let nickname = "div.c-hero--full__headline-prefix";
let status = "div.c-bio__row--1col";
let hometown = "div.c-bio__row--2col";
let physicalStats = "div.c-bio__row--3col";
let wins = "div.c-record__promoted-figure";
let strikingAccuracy = "div.e-chart-circle__wrapper";
let strikesLanded = "dd.c-overlap__stats-value";

let NameProfile = "span.c-listing-athlete__name";
let weightclassesProfile = "span.c-listing-athlete__title";
let recordsProfile = "span.c-listing-athlete__record";
let nicknamesProfile = "span.c-listing-athlete__nickname";
let socialProfiles = "a.c-listing-athlete-flipcard__social-link";

let headliners = "h3.c-card-event--result__headline";

const selectors = {
	individual: {
		nickname,
		status,
		hometown,
		physicalStats,
		wins,
		strikingAccuracy,
		strikesLanded,
	},

	roster: {
		NameProfile,
		weightclassesProfile,
		recordsProfile,
		nicknamesProfile,
		socialProfiles,
	},

	event: { headliners },
};

module.exports = {
	selectors,
};
