var router = require("express").Router();
var headlinesroutes= require("./headlines");
var commentsroutes= require("./comments");
router.use("/headlines",headlinesroutes);

router.use("/comments",commentsroutes);

module.exports = router;