const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await hashPassword(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};

exports.signin = async (req, res) => {
  try {
    const token = createToken(req.user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
