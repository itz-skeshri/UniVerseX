require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Import Database Connection
const connectDB = require("./config/db");

// Import Middleware
const { authMiddleware, isAuthorised } = require("./middlewares/authMiddleware.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");

// Import Routes
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes=require("./routes/Profile.js")
const { cloudinaryConnect } = require("./config/cloudinary");

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

//cloudinary connection
cloudinaryConnect();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || "*" }));
app.use(morgan("dev"));
app.use(cookieParser());

// Test Route (No Authentication Required)
app.get("/api/test", (req, res) => {
    res.send("Hello, API is working!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts",  postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions",  reactionRoutes);
app.use("/api/notifications", notificationRoutes);

// Global Error Handling Middleware
app.use(errorMiddleware);

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the Campus Connection API 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});