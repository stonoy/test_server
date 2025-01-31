const express = require("express")
const userAuth = require("../middleware/auth")
const { createPost, getAllPosts, userPosts, getSinglePost, updatePost, deletePost } = require("../controllers/post")
const postRoutes = express.Router()

postRoutes.post("/create", userAuth, createPost)
postRoutes.get("/all", getAllPosts)
postRoutes.get("/userposts", userAuth, userPosts)
postRoutes.get("/singlepost/:postId", getSinglePost)
postRoutes.patch("/update/:postId", userAuth, updatePost)
postRoutes.delete("/delete/:postId", userAuth, deletePost)

module.exports = postRoutes