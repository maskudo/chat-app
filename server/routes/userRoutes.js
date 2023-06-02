const {
  register,
  login,
  getAllUsers,
  setAvatar,
  getUser,
} = require("../controllers/userController");
const auth = require("../jwtAuth");

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.patch("/:id/setavatar", auth, setAvatar);
router.get("/:id", getUser);
module.exports = router;
