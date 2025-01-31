const express = require("express")
const { createOrder, checkWebhook } = require("../controllers/payment")
const userAuth = require("../middleware/auth")

const payRoutes = express.Router()

payRoutes.get("/initiate/:type",userAuth, createOrder)
payRoutes.post("/webhook", checkWebhook)

module.exports = payRoutes