const instance = require("../config/razorpay")
const { memberTypes, RP_KEY } = require("../constants")
const createError = require("../errorClass")
const Payment = require("../models/payment")

const createOrder = async (req, res) => {
    const {type} = req.params
    const loggedInUser = req.user

    if (!Object.keys(memberTypes).includes(type)){
        createError("invalid member type", 400)
        return
    }

    const options = {
        amount: memberTypes[type],
        currency: "INR",
        receipt: "order_rcptid_11",
        notes: {
            name: loggedInUser.name,
            email: loggedInUser.email,
            type
        }
    }

    // console.log(options)

    const order = await instance.orders.create(options)

    // console.log(order)

    const newPayment = Payment({
        userId: loggedInUser._id,
        orderId: order.id,
        amount: order.amount,
        status: order.status
    })

    await newPayment.save()

    res.json({...order, key: RP_KEY})
}

const checkWebhook = async (req, res) => {
    console.log(req.body)

    res.status(200).json({msg : "ok"})
}


module.exports = {createOrder, checkWebhook}