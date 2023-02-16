const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      isLogged: req.session.isLogged,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      isLogged: req.session.isLogged,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.render("500", { layout: "error", error });
    console.log(error);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      isLogged: true,
    });
  } catch (error) {
    res.render("500", { layout: "error", error });
  }
});

router.get("/signup", (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

router.get("/signin", (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signin");
});

module.exports = router;
