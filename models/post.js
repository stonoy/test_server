const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "too short"],
        maxLength: [100, "exceeds max length"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags :{
        type: [String],
    },
    timing: {
        type: String,
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post