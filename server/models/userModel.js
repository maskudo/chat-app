const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  avatarImage: {
    type: String,
    default:
      "https://www.dlf.pt/dfpng/maxpng/276-2761324_default-avatar-png.png",
  },
});

module.exports = mongoose.model("User", userSchema);
