const mongoose = require("mongoose")



async function connectDb(conn_uri){
    await mongoose.connect(conn_uri)
}

module.exports = connectDb

