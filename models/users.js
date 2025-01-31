const mongoose = require("mongoose")
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "atleast 2 characters"],
        maxLength: [10, "max 10 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(e){
            if (!validator.isEmail(e)){
                throw new Error("email is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : {
            values: ["user","silver", "gold", "admin"],
            message: '{value} is not supported'
        },
        required: true,
    }
}, {timestamps: true})

UserSchema.methods.createJwt = async function(){
    return await jwt.sign({_id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
}

UserSchema.methods.compareHash = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", UserSchema)

module.exports = User