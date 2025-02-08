const express = require("express");
const { addComment, getComments, deleteComment, likeComment } = require("../controllers/commentController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();
// console.log(authMiddleware);

router.post("/:postId", authMiddleware, addComment);
router.get("/:postId", getComments);
router.delete("/:commentId", authMiddleware, deleteComment);
router.put("/:commentId/like", authMiddleware, likeComment);

module.exports = router;