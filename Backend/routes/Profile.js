const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/authMiddleware")
const {
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router