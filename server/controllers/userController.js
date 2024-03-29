const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username already taken",
        status: false,
      });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPwd,
    });
    //mongodb returns a read only copy in user so convert it to js object
    const userObject = user.toObject();
    delete userObject.password;
    const token = jwt.sign({ user: userObject }, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });
    return res.status(201).json({ status: true, user: userObject, token });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        msg: "Username not found!",
        status: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });
    }
    const userObject = user.toObject();
    delete userObject.password;
    const token = jwt.sign({ user: userObject }, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });
    return res.status(201).json({ status: true, user: userObject, token });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    return res.json(user);
  } catch (error) {
    res.status(404).json({
      msg: "User not found",
      status: false,
    });
  }
};
module.exports.getAvatar = async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(process.env.PWD, "uploads", filename);
  // Send the image file as a response
  res.sendFile(imagePath);
};

module.exports.setAvatar = async (req, res) => {
  try {
    // TODO: remove the old avatar from storage when new stored
    const userId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filename = req.file.filename;

    const avatarImage = `http://localhost:${process.env.PORT}/api/auth/static/${filename}`;

    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({
        msg: "Username not found!",
        status: false,
      });
    }
    if (avatarImage) {
      user.avatarImage = avatarImage;
    }
    await user.save();
    return res.status(201).json({ status: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Error updating user" });
  }
};
