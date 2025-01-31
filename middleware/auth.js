const createError = require("../errorClass")
const User = require("../models/users")
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const {token} = req.cookies
    

    if (!token){
        createError("no cookie", 403)
        return
    }

    

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded?._id)

    

    if (!user){
       
        createError("invalid user", 403)
        return
    }

    req.user = user

    next()
}

module.exports = userAuth