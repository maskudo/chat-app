const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error) => {
      if (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
