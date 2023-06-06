const {
  register,
  login,
  getAllUsers,
  setAvatar,
  getAvatar,
  getUser,
} = require("../controllers/userController");
const { v4: uuidv4 } = require("uuid");
const auth = require("../jwtAuth");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });

const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/static/:filename", getAvatar);
router.patch("/:id/setavatar", auth, upload.single("avatar"), setAvatar);
router.get("/:id", getUser);
module.exports = router;
