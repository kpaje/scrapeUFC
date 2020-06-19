const { Athlete } = require("./class");

let site = "https://www.ufc.com/athlete/israel-adesanya";
let mainSelector = "div.c-hero--full__container";
let pagesToScrape = 1;

var createAdesanya = new Athlete(pagesToScrape, site, mainSelector).scraper();
createAdesanya;
