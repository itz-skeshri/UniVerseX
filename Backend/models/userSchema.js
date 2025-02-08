const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true },
        college: { type: String, required: true },
        department: { type: String, required: true },
        year: { type: Number, min: 1, max: 4 },
        image: { type: String }, // Profile picture
        bio: { type: String, default: "" },
        socialLinks: {
            github: { type: String, default: "" },
            linkedin: { type: String, default: "" },
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        role: { type: String, enum: ["Admin", "Student"], required: true, default: "Student" },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);