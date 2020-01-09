var router = require("express").Router();
var scrapecontroller= require("../../controller/scrape.js");

router.get("/scrape", scrapecontroller.scrape);

module.export = router;