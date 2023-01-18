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

  Like: async (req, res) => {
    const post = await Post.findById(req.body.post_id)
    const filter = { _id: req.body.post_id };
    const new_likes = post.likes+req.body.like
    const update = { likes: new_likes };
    await Post.findOneAndUpdate(filter, update);
    res.json(post)
  },

  CreateComment: async (req, res) => {
    const post = await Post.findById(req.body.post_id)
    const filter = { _id: req.body.post_id };
    comment = new Comment(req.body)

    comment.save()
    
    console.log('COMMENT', comment)
    const new_comments = [...post.comments, comment]
    const update = { comments: new_comments };
    await Post.findOneAndUpdate(filter, update);
    res.json(comment)
  },
  GetComments: async (req, res) => {

    const filter = { post_id: req.param("id") };
    const comments = await Comment.find(filter)
    console.log("COMMENTS: ", comments)
    res.json(comments)
  },

  // error if post does not exist?
  Delete: async (req, res) => {
    await Post.deleteOne({ _id: req.body._id})
    const allPosts = await Post.find()
    console.log("ALL", allPosts)
    res.status(200).json(allPosts)
  }

};

module.exports = PostsController;
