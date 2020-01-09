var router = require("express").Router();
var apiroutes= require("./api");
router.use("/api", apiroutes);

module.exports=router;