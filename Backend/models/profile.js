const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({

	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
	socialLinks: {
				github: { type: String, default: "" },
				linkedin: { type: String, default: "" },
			},
});

// Export the Profile model
module.exports = mongoose.model("profile", profileSchema);
