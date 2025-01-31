const express = require("express")
require('express-async-errors');
const cookieParser = require('cookie-parser')
const cors = require("cors")
const path = require("path")
const { dirname } = require("path")
require('dotenv').config()
// import { fileURLToPath } from "url";

const connectDb = require("./config/database")
const User = require("./models/users")
const errorMiddleware = require("./middleware/error");
const { userCon, register } = require("./controllers/user");
const authRoutes = require("./routes/auth_routes");
const postRoutes = require("./routes/post_routes");
const payRoutes = require("./routes/pay_routes");

// const asyncWrapper = require("./utils")
const app = express()

app.use(cors({
    origin: "http://localhost:5173", // Vite's default port
    credentials: true, // Allow cookies
  }))
app.use(express.static(path.resolve(__dirname, "./client/dist"))); // PROVIDING FRONTEND APP
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", authRoutes)
app.use("/api/post", postRoutes)
app.use("/api/payment", payRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html")); // SERVER GIVEING FRONTEND APP TO USERS
  });

// not found
app.use("*", (req, res) => {
    res.send("not found")
})

// express error handler
app.use(errorMiddleware)


connectDb(process.env.DB_URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is listening on port 8080")
    })
})
.catch((err) => {
    console.log("can not connect to mongodb" + err)
})


