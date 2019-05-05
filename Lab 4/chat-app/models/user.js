const integerValidator = require("mongoose-integer");

const mongoose = require("mongoose");
const validator = require("validator");
// let mongooseHidden = require("mongoose-hidden")();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const jwtSignPromise = util.promisify(jwt.sign);
const jwtVerifyPromise = util.promisify(jwt.verify);

const jwtKey = "secretKey";

const saltRounds = 5;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      minlength: 3,
      match: /^[a-zA-Z ]+[a-zA-Z]$/
    },
    age: {
      type: Number,
      min: 18,
      max: 90,
      required: true,
      integer: true
    },
    email: {
      type: String,
      unique: true,
      validate: validator.isEmail,
      required: true
    },
    password: {
      type: String,
      required: true,
      hide: true
    },

    gender: {
      type: String,
      lowercase: true,
      enum: ["female", "male"],
      required: true
    },
    country: {
      type: String,
      default: "n/a",
      lowercase: true,
      enum: ["eg", "UK", "USA"]
    }
  },
  {
    toObject: {
      transform: (doc, ret, options) => {}
    }
  }
);

userSchema.pre("save", async function() {
  console.log(this);
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
});

userSchema.method("verifyPassword", async function(password) {
  return bcrypt.compare(password, this.password);
});

userSchema.method("generateToken", function() {
  return jwtSignPromise({ id: this._id }, jwtKey, { expiresIn: "4d" });
});
userSchema.static("verifyToken", async function(token) {
  const decodded = await jwtVerifyPromise(token, jwtKey);

  return this.findById(decodded.id);
});

// console.log(mongoose.connection.readyState);
// userSchema.plugin(mongooseHidden, { hidden: { _id: false } }); //to send user id

userSchema.plugin(integerValidator);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

////////////////////////////////////////////////////////////////////////////////////////////
