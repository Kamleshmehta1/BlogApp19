// import express from "express";
const bcrypt = require("bcrypt");
const User = require("../model/User");
const express = require("express");
const router = express.Router();

router.get("/", async (req, resp, next) => {
  //get all users
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return resp.status(404).json({ message: "No users found" });
  }
  return resp.status(200).json({ users });
});

router.post("/signup", async (req, resp, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return resp.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = bcrypt.hashSync(String(password), 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    user.save();
  } catch (err) {
    console.log(err);
  }
  return resp.status(201).json({ user });
});

router.post("/login", async (req, resp, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return resp
      .status(404)
      .json({ message: "Couldn't find user with thi email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    String(password),
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return resp.status(400).json({ message: "Incorrect password" });
  }
  return resp
    .status(200)
    .json({ message: "Login Successfull", user: existingUser });
});

module.exports = router;
