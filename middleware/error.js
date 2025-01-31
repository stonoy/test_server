const errorMiddleware = (err, req, res, next) => {
    const msg = err.message || "internal server error"
    const statusCode = err.status || 500

    res.status(statusCode).json({
        msg
    })
}

module.exports = errorMiddleware