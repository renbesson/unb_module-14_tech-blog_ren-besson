const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

////////////////////////////////////////////////////////////////////////////////////////
// Add new post
////////////////////////////////////////////////////////////////////////////////////////
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      date_created: sequelize.DATE,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Update post
////////////////////////////////////////////////////////////////////////////////////////
router.put("/:id", withAuth, async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const editedPost = await Post.update(
      { title, text },
      {
        where: {
          id: req.body.post_id,
        },
      }
    );

    res.status(200).json(editedPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Delete post
////////////////////////////////////////////////////////////////////////////////////////
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
