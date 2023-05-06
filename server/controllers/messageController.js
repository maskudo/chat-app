const Message = require("../models/messageModel");
const bcrypt = require("bcrypt");

module.exports.createMessage = async (req, res, next) => {
  try {
    console.log(req.body);
    const { text, sender, receiver } = req.body;
    const message = await Message.create({
      text,
      sender,
      receiver,
    });
    return res.json({ status: true, data: message });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {};
module.exports.getMessageBySenderReceiver = async (req, res, next) => {
  try {
    const { sender, receiver } = req.params;
    console.log(sender, receiver);
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("sender")
      .populate("receiver");
    return res.json(messages);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteMessageById = async (req, res, next) => {};
