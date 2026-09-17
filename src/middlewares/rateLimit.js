const rateLimit = require("express-rate-limit")

const allowList= ["::1"]

const apiLimiter=rateLimit({
    windowMs : 15*60*1000,
    max: (req,res)=>{
        console.log("Api Url : ",req.url);
        if(req.url=="/auth/login" || req.url=="/auth/register"){
            return 5
        }
        else{
            return 100
        }
    },
    message:{
        success : false,
        message : "Many request"
    },
    skip:(req,res)=>allowList.includes(req.ip),
    standardHeaders:true,
    legacyHeaders:false
})

module.exports = apiLimiter;