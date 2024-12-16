const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("The user already exists!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("User not found!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password!");
  }
  return user;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
