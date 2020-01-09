var express = require("express");
var router = express.Router();
var path = require("path");


var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

module.exports = {
    findAll: function (req, res) {
        request("https://www.news.yahoo.com", function (error, response, html) {
            var $ = cheerio.load(html);
            var titlesArray = [];

            $("").each(function (i, element) {
                var result = {};

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
    },
    findArticles: function (req, res) {
        Article.find().sort({ _id: -1 }).exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var artcl = { article: doc };
                res.render("index", artcl);
            }
        });
    },


    findArticlesJson: function (req, res) {
        Article.find({}, function (err, doc) {
            if (err) {
                console.log(err);

            } else {
                res.json(doc)
            }
        });
    },

     // Route for grabbing a specific Article by id, populate it with it's note
  findArticleId: function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  }

}

