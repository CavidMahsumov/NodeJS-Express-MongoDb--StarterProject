const jwt= require("jsonwebtoken");
const user= require("../models/user.model")
const APIError = require("../utils/errors");
const createToken = async(user,res) =>{
    console.log(user);
    const payload={
        sub:user._id,
        name:user.name,
    }
    const token= await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        algorithm:"HS512",
        expiresIn:process.env.JWT_EXPIRES_IN
    })



    return res.status(200).json({
        success:true,
        token:token,
        message:"Login successful"
    })
}

const tokenCheck = async (req,res,next)=>{
    const headerToken =  req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ;
    
    if(!headerToken){
        throw new APIError("Token not found !", 401);
    }

    const token= req.headers.authorization.split(" ")[1];

    console.log("Token: ", token);

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err,decoded)=>{
        if(err) throw new APIError("Invalid Token", 401)

        const userInfo= await user.findById(decoded.sub).select("_id name lastname email ")  
        console.log("UserInfo : ", userInfo)  
        if(!userInfo)
            throw new APIError("Invalid Token",401)

        req.user=userInfo;
        next();
    
    })


    
    next(userInfo);

}

module.exports ={
    createToken,
    tokenCheck
}