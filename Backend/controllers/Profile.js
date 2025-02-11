const Profile = require("../models/profile")
const User = require("../models/userSchema")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    // Extract user ID from token
    const userId = req.user.id;
    console.log(userId);

    // Find the user by ID
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the associated profile
    const profile = await Profile.findById(userDetails.additionalDetails);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Update user details
    userDetails.firstName = firstName || userDetails.firstName;
    userDetails.lastName = lastName || userDetails.lastName;
    await userDetails.save();

    // Update profile details
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.contactNumber = contactNumber || profile.contactNumber;
    profile.gender = gender || profile.gender;
    await profile.save();

    // Fetch the updated user with populated profile details
    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

// exports.deleteAccount = async (req, res) => {
//   try {
//     const id = req.user.id
//     console.log(id)
//     const user = await User.findById({ _id: id })
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       })
//     }
//     // Delete Assosiated Profile with the User
//     await Profile.findByIdAndDelete({
//       _id: new mongoose.Types.ObjectId(user.additionalDetails),
//     })
//     for (const courseId of user.courses) {
//       await Course.findByIdAndUpdate(
//         courseId,
//         { $pull: { studentsEnroled: id } },
//         { new: true }
//       )
//     }
//     // Now Delete User
//     await User.findByIdAndDelete({ _id: id })
//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     })
//     await CourseProgress.deleteMany({ userId: id })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "User Cannot be deleted successfully" })
//   }
// }

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


