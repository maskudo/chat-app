module.exports.register = (req, res, next) => {
  console.log('hello from controller');
  console.log(req.body);
  next();
};
