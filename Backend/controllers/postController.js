const Post = require("../models/postSchema");

// Create Post
exports.createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const post = new Post({ user: req.user.userId, content, image, college: req.user.college });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "firstName lastName image");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.likes.includes(req.user.userId)) {
            post.likes = post.likes.filter(id => id.toString() !== req.user.userId);
        } else {
            post.likes.push(req.user.userId);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};