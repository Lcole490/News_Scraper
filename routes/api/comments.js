var router = require("express").Router();
var commentscontroller= require("../../controller/comments.js");


router.get("/:id", commentscontroller.find);
router.post("/", commentscontroller.create);
router.delete("/:id", commentscontroller.delete);


module.exports = router;