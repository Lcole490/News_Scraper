var router = require("express").Router();
var headlinescontroller= require("../../controller/headlines.js");
router.get("/",headlinescontroller.findAll);
// router.get("/articles",headlinescontroller.findArticles);
// router.get("/articles-json",headlinescontroller.findArticlesJson);
router.delete("/:id", headlinescontroller.delete);
router.put("/:id", headlinescontroller.update);

module.exports = router;
