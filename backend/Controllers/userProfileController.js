const User = require("../models/userModel");

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
    //   console.log(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Validate update data (optional, but recommended)
    if (updateData.password) {
      return res
        .status(400)
        .json({ error: "Password cannot be updated here." });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: errors });
  }
};

module.exports = { getProfile, updateProfile };
