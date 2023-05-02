const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username already taken",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already taken", status: false });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPwd,
    });
    //mongodb returns a read only copy in user so convert it to js object
    const userObject = user.toObject();
    delete userObject.password;
    return res.json({ status: true, userObject });
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
    return res.json({ status: true, user: userObject });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {}
};
