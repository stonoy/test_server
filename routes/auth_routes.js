const express = require("express")
const { register, login, getUser, logout } = require("../controllers/user")
const userAuth = require("../middleware/auth")

const authRoutes = express.Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.get("/logout",userAuth, logout)
authRoutes.get("/getuser/:userId", userAuth, getUser)

module.exports = authRoutes