const Post = require("../models/post");
const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");
const { db } = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  CreateComment: async (req, res) => {
    const post = await Post.findById(req.body.post_id)
    const filter = { _id: req.body.post_id };
    const new_comments = [...post.comments, req.body.text]
    const update = { comments: new_comments };
    await Post.findOneAndUpdate(filter, update);
    res.json(post)
    
  },

};

module.exports = PostsController;
