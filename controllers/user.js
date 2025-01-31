const createError = require("../errorClass");
const User = require("../models/users")
const bcrypt = require('bcrypt');


const register = async (req, res) => {
        const {name, email, password} = req.body
    
        // check admin availability
        const userCount = await User.countDocuments()
    
        const hash = await bcrypt.hash(password, 10)
    
        const newUser = User({
            name,
            email,
            password: hash,
            role: userCount == 0 ? "admin" : "user"
        })
    
        await newUser.save()
    
        res.json({
            msg: "user registered... pls login"
        })
    }

const login = async (req, res) => {
    const { email, password} = req.body

    const theUser = await User.findOne({email})

    if (!theUser){
        createError("invalid user", 400)
        return
    }

    const hasPasswordMatched = theUser.compareHash(password)
    if (!hasPasswordMatched){
        createError("password not matched", 401)
        return
    }

    const token = await theUser.createJwt()

    

    res.cookie("token", token, {expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true, sameSite: "lax"})

    res.json({
        theUser
    })
}

const getUser = async (req, res) => {
    const {userId} = req.params
    console.log(req.user)

    const thenUser = await User.findById(userId)

    res.json({
        thenUser
    })
}

const logout = (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now()), httpOnly: true})
    res.json({
        msg: "user logged out"
    })
}

module.exports = {register, login,logout, getUser}