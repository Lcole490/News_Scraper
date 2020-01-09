var mongoose = require("mongoose");


var Schema = mongoose.Schema;
var CommentSchema= new Schema({
    name: {
        type: String
        
    },

    body: {
        type: String,
        required: true
    } ,

    ArticleId: {
        type: Schema.Types.ObjectId, 
        ref: "Article"
    }
   
});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;