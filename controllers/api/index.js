const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
