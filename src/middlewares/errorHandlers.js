const APIError = require('../utils/errors');

const errorHandlerMiddleware = (err, req, res, next) =>{
    if(err instanceof APIError) {
        return res.status(err.statusCode)
        .json({
            success:false,
            message:err.message
        })
    }
    return res.status(500).json({
        message:"Internal Server Error"
    })
}

module.exports = errorHandlerMiddleware;