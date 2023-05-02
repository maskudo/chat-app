const {
  createMessage,
  getAllMessages,
  getMessageBySenderReceiver,
  deleteMessageById,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", createMessage);
router.get("/", getAllMessages);
router.get("/:sender/:receiver", getMessageBySenderReceiver);
router.delete("/:id", deleteMessageById);

module.exports = router;
