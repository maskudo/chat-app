const Message = require("../models/messageModel");

module.exports.createMessage = async (req, res, next) => {
  try {
    const { text, sender, receiver } = req.body;
    const message = await Message.create({
      text,
      sender,
      receiver,
    });
    const popMessage = await Message.findOne({ _id: message._id })
      .populate({ path: "sender", select: "-password" })
      .populate({ path: "receiver", select: "-password" });
    return res.json({ status: true, data: popMessage });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {};
module.exports.getMessageBySenderReceiver = async (req, res, next) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate({ path: "sender", select: "-password" })
      .populate({ path: "receiver", select: "-password" });
    return res.json(messages);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteMessageById = async (req, res, next) => {};
