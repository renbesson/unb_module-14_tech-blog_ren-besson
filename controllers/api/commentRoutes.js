const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");
const { where } = require("sequelize");

////////////////////////////////////////////////////////////////////////////////////////
// Add new comment
////////////////////////////////////////////////////////////////////////////////////////
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      date_created: sequelize.DATE,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Update comment
////////////////////////////////////////////////////////////////////////////////////////
router.put("/:id", withAuth, async (req, res) => {
  const text = req.body.text;

  try {
    const editedComment = await Comment.update(
      { text },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Delete comment
////////////////////////////////////////////////////////////////////////////////////////
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
