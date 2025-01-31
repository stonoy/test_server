const createError = require("../errorClass")
const Post = require("../models/post")
const User = require("../models/users")
const { checkPostReqBody } = require("../sanitize/postSanitize")

const provideUserDetailsWithPosts = "name role"

const createPost = async (req, res) => {
    checkPostReqBody(req.body)

    const loggedInUserId = req.user._id

    // check author
    const author = await User.findById(loggedInUserId)

    if (!author){
        createError("invalid author", 400)
        return
    }

    const newPost = Post({
        body: req.body.body,
        author: loggedInUserId,
        tags: req.body.tags || [],
        timing: req.body.hasDate ? req.body.timing : "",
    })

    await newPost.save()

    res.json({msg :" post created"})
}

const getAllPosts = async (req, res) => {
    const allPosts = await Post.find({}).populate("author", provideUserDetailsWithPosts)

    res.json({posts: allPosts})
}

const getSinglePost = async (req, res) => {
    const {postId} = req.params
    

    const post = await Post.findById(postId).populate("author", provideUserDetailsWithPosts)

    res.json({post})
}

const userPosts = async (req, res) => {
    const loggedInUserId = req.user._id
    

    // check author
    const author = await User.findById(loggedInUserId)

    if (!author){
        createError("invalid author", 400)
        return
    }

    const userPosts = await Post.find({author})

    res.json({posts: userPosts})
}

const updatePost = async (req, res) => {
    checkPostReqBody(req.body)
    const {body, tags, timing, hasDate} = req.body
    const {postId} = req.params

    const loggedInUserId = req.user._id

    // check author
    const author = await User.findById(loggedInUserId)

    if (!author){
        createError("invalid author", 400)
        return
    }

    const thePost = await Post.findOne({_id:postId, author})
    if (!thePost){
        createError("invalid post", 400)
        return
    }

    thePost.body = body
    thePost.tags = tags
    thePost.timing = hasDate ? timing : ""

    await thePost.save()

    res.json({msg :" post updated"})
}

const deletePost = async (req, res) => {
    const {postId} = req.params

    const loggedInUserId = req.user._id

    // check author
    const author = await User.findById(loggedInUserId)

    if (!author){
        createError("invalid author", 400)
        return
    }

    const deletedPost = await Post.findOneAndDelete({_id:postId, author}) // will not tell that searched post does not exist

    if (!deletedPost){
        createError("invalid post", 400)
        return
    }

    res.json({deletedPost})
}

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    userPosts,
    updatePost,
    deletePost
}
