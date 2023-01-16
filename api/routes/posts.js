const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.Like);
router.post("/comment", PostsController.CreateComment);
router.get("/comments/:id", PostsController.GetComments);

module.exports = router;
