var express = require("express");
var router = express.Router();
var path = require("path");


var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");


router.get("/", function (req, res) {
    request("https://www.news.yahoo.com", function (error, response, html) {
        var $ = cheerio.load(html);
        var titlesArray = [];

        $("").each(function (i, element) {
            var result={};

            result.title = $(this)
                .children("a")
                .text();

            result.link = $(this)
                .children("a")
                .attr("href");


            if (result.title !== "" && result.link !== "") {
                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title);

                    Article.count({ title: result.title }, function (err, test) {
                        if (test === 0) {
                            var entry = new Article(result);

                            entry.save(function (err, doc) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(doc)
                                }
                            })
                        }
                    })
                } else {
                    console.log("Article exists already!");
                }
            } else {
                console.log("Data Missing, not saved to DB");
            }
        });
        res.redirect("/")
    });
});


router.get("/articles", function(req,res){
    Article.find().sort({_id: -1}).exec(function(err,doc){
        if (err){
            console.log(err);
        } else {
            var artcl ={ article: doc};
            res.render("index", artcl);
        }
    });
});


router.get("/articles-json", function(req, res){
    Article.find({}, function(err, doc){
        if (err) {
            console.log(err);

        }else {
            res.json(doc)
        }
    });
});

module.exports = router;