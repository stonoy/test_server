const createError = require("../errorClass")

function checkPostReqBody(body){
    const maxTags = 5
    const maxTagLength = 10

    if(body.tags){
        if (body.tags.length > maxTags || body.tags.some(tag => tag.length > maxTagLength)){
            createError("provide valid tags", 400)
            return
        }
    }

    if(body.hasDate && body.timing){
        const date = new Date(body.timing).getTime()

        if (Object.is(date, NaN)){
            createError("provide a valid date", 400)
            return
        }

        if (date < Date.now()){
            createError("date should be in future", 400)
            return
        }
    }
}


module.exports = {checkPostReqBody}