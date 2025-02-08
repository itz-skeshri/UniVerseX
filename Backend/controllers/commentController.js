const Comment = require("../models/commentSchema");

// Add Comment
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = new Comment({
            user: req.user.userId,
            post: req.params.postId,
            content
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Comments for a Post
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate("user", "firstName lastName image");
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like Comment
exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.likes.includes(req.user.userId)) {
            comment.likes = comment.likes.filter(id => id.toString() !== req.user.userId);
        } else {
            comment.likes.push(req.user.userId);
        }

        await comment.save();
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};