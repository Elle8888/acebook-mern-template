const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

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
  Like: async (req, res) => {
    const post = await Post.findById(req.body.post_id)
    const filter = { _id: req.body.post_id };
    const new_likes = post.likes+req.body.like
    const update = { likes: new_likes };
    await Post.findOneAndUpdate(filter, update);
    res.json(post)
  },
};

module.exports = PostsController;
