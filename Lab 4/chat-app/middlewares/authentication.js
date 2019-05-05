var createError = require("http-errors");
const UserModel = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await UserModel.verifyToken(token);
    if (!user) next(createError(401));
    req.user = user; // to detect user at any time
    next();
  } catch (err) {
    next(createError(401, "unauthorized"));
  }
};
