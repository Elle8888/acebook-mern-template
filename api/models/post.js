const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: String,
  message: String,
  date: String,
  likes: Number,
  comments: [String],
  // comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
  profile_picture_url: String,
  post_img_url: String,

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
