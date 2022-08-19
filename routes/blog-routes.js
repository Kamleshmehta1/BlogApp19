// import express from "express";
const express = require("express");
const blogRouter = express.Router();
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

blogRouter.get("/", async (req, resp, next) => {
  let blogs;
  blogs = await Blog.find({}).populate("user");
  return resp.status(200).json({ blogs });
});

blogRouter.get("/:key", async (req, resp, next) => {
  let blogs;
  blogs = await Blog.find({
    $or: [{ title: { $regex: req.params.key, $options: "i" } }],
  }).populate("user");
  return resp.status(200).json({ blogs });
});

blogRouter.post("/add", async (req, resp, next) => {
  const { title, description, image, user, date, like, bool } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return resp.status(500).json({ message: "Unable to find user by this ID" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
    date,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return resp.status(500).json({ message: err });
  }
  return resp.status(200).json({ blog });
});

blogRouter.put("/update/:id", async (req, resp, next) => {
  const { title, description, image, date } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
      date,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return resp.status(500).json({ message: "Unable to update the blog" });
  }
  return resp.status(200).json({ blog });
});

blogRouter.get("/:id", async (req, resp, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return resp.status(404).json({ message: "No blog found" });
  }
  return resp.status(200).json({ blog });
});

blogRouter.delete("/:id", async (req, resp, next) => {
  let id = req.params.id;

  let blog;

  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch {
    return console.log(err);
  }
  if (!blog) {
    return resp.status(400).json({ message: "Unable to delete" });
  }
  return resp.status(200).json({ message: "Successfully Deleted" });
});

blogRouter.get("/user/:id", async (req, resp, next) => {
  let userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return resp.status(404).json({ message: "No blogs found" });
  }
  return resp.status(200).json({ user: userBlogs });
});

module.exports = blogRouter;
