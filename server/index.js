const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const User = require("./models/userModel");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.error(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on Port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// global.onlineUsers = new Map();
global.onlineUsers = {};

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // onlineUsers.set(userId, socket.id);
    global.onlineUsers[userId] = socket.id;
    // console.log("add-user", userId);
  });

  socket.on("send-msg", (data) => {
    // console.log(data);
    // console.log(global.onlineUsers);
    // const sendUserSocket = onlineUsers.get(data.receiver);
    const sendUserSocket = onlineUsers[data.receiver];
    // console.log("sendusersocker", sendUserSocket);
    if (sendUserSocket) {
      getUserFromId(data.sender).then((sender) => {
        getUserFromId(data.receiver).then((receiver) => {
          socket
            .to(sendUserSocket)
            .emit("msg-receive", { ...data, sender, receiver });
        });
      });
    }
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(global.onlineUsers).find(
      (key) => global.onlineUsers[key] === socket.id
    );
    if (userId) {
      delete global.onlineUsers[userId];
      // console.log("User disconnected:", userId);
    }
  });
});

async function getUserFromId(id) {
  const user = await User.findOne({ _id: id }).select([
    "username",
    "_id",
    "avatarImage",
  ]);
  return user;
}
