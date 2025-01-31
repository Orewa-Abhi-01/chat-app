const { generateToken } = require("../lib/utils");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {cloudinary} = require("../lib/cloudinary");

const { body, validationResult } = require("express-validator");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "This email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     // Step 1: Validate the request body fields using express-validator
//     await body('email').isEmail().withMessage('Invalid email format').run(req);
//     await body('profilePic').optional().isURL().withMessage('Invalid image URL').run(req);

//     // If there are validation errors, return a response with the errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { fullName, email, profilePic, password } = req.body;
//     const userId = req.user._id; // assuming the user id is passed from authenticated user

//     // Step 2: Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Step 3: Handle password change (if password is provided)
//     if (password) {
//       const salt = await bcrypt.genSalt(10); // Salt rounds
//       const hashedPassword = await bcrypt.hash(password, salt); // Hash the new password
//       user.password = hashedPassword; // Update password
//     }

//     // Step 4: Handle profile picture upload (if provided)
//     if (profilePic) {
//       try {
//         const uploadResponse = await cloudinary.uploader.upload(profilePic);
//         user.profilePic = uploadResponse.secure_url; // Store the secure URL from Cloudinary
//       } catch (uploadError) {
//         return res.status(500).json({ message: "Cloudinary upload failed", error: uploadError.message });
//       }
//     }

//     // Step 5: Dynamically update other fields (fullName and email)
//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;

//     // Step 6: Save the updated user data
//     await user.save();

//     // Step 7: Return the updated user object (excluding password)
//     return res.status(200).json({
//       user,  // Return the updated user directly
//       message: "Profile updated successfully",
//     });
//   } catch (error) {
//     console.log("Error in updateProfile controller:", error.message);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// gives the authenticated user details only  using the token

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    console.log("request body:", req.body);

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Check if cloudinary is defined
    if (!cloudinary) {
      console.error("Cloudinary is not defined");
      return res
        .status(500)
        .json({ message: "Cloudinary configuration error" });
    }

    // const uploadResponse = await cloudinary.uploader.upload(profilePic);
    try {
      const uploadResponse = await cloudinary.uploader.upload_large(profilePic);
      console.log("uploadResponse:", uploadResponse);

      const updatedUser = await User.findByIdAndUpdate(
        userId,

        { profilePic: uploadResponse.secure_url },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (uploadError) {
      console.error("Cloudinary upload failed:", uploadError.message);
      return res
        .status(500)
        .json({
          message: "Cloudinary upload failed",
          error: uploadError.message,
        });
    }
  } catch (error) {
    console.log("error in update profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
