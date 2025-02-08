const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        image: { type: String }, // Optional image for the post
        college: { type: String, required: true }, // To filter posts by college
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        visibility: { type: String, enum: ["Public", "College Only"], default: "College Only" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);