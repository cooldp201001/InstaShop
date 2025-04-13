const user = require("../models/userModel");
const jwtUtils = require("../utils/jwtUtils");

// Registration Route
const userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    // Generate JWT token (same as login)
    let userInfo = {
      id: newUser._id,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
    };
    const token = jwtUtils.generateToken(userInfo);

    // Set the token in an HTTP-only cookie (same as login)
    res.cookie("token", token, {
      httpOnly: true, // Use httpOnly: true in production
      secure: false, // Set to true in production (HTTPS)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send token in response (same as login)
    res.json({ message: "User registered and logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { userRegister };
