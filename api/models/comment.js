const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post_id: ObjectID,
  author_user_id: ObjectID,
  author: String,
  text: String,
  date: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
