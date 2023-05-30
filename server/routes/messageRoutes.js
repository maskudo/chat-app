const {
  createMessage,
  getAllMessages,
  getMessageBySenderReceiver,
  deleteMessageById,
} = require("../controllers/messageController");
const auth = require("../jwtAuth");

const router = require("express").Router();

router.post("/", auth, createMessage);
router.get("/", auth, getAllMessages);
router.get("/:sender/:receiver", auth, getMessageBySenderReceiver);
router.delete("/:id", auth, deleteMessageById);

module.exports = router;
