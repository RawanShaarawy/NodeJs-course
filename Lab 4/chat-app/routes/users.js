var express = require("express");
var router = express.Router();
const createError = require("http-errors");
const User = require("./../models/user");
const auth = require("../middlewares/authentication");

router.post("/", function(req, res, next) {
  // res.send('respond with a resource');
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(createError(400, err.message));
    });
});

router.post("/login", async function(req, res, next) {
  const { username, password } = req.body;
  const currentUser = await User.findOne({ username });
  if (!currentUser) return next(createError(401)); // return keyword is important
  let passwordMatch = await currentUser.verifyPassword(password);
  if (!passwordMatch) return next(createError(401)); // return keyword is important
  const token = await currentUser.generateToken();
  res.send({ profile: currentUser, token });
});

router.use(auth);
/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      next(createError(500, err.message));
    });
});

router.get("/:userId", function(req, res, next) {
  // res.send('respond with a resource');
  User.findById(req.params.userId)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(createError(404, err.message));
    });
});

router.patch("/:userId", function(req, res, next) {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)));
});
router.delete("/:userId", function(req, res, next) {
  User.findByIdAndDelete(req.params.userId)
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)));
});

module.exports = router;
