class CustomError extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    }
}

function createError(msg, status){
    throw new CustomError(msg, status)
}

module.exports = createError