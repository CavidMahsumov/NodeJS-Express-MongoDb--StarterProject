require('express-async-errors');
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');
const {createToken} = require('../middlewares/auth');
const login = async (req,res)=>{
    const {email,password} = req.body;
    const userExists = await user.findOne({email});
    console.log("User exists: ", userExists);
    if(!userExists){
        throw new APIError("User not found !", 401);
    }
    const comparePassword = await bcrypt.compare(password, userExists.password);
    if(!comparePassword){
        throw new APIError("Invalid password !", 401);
    }
    createToken(userExists,res);
}
const register=async (req,res)=>{
    const {email} = req.body;
    
    const userExists = await user.findOne({email});

    if(userExists){
        throw new APIError("User already exists !", 400);
    }


    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("Hashed password: ", req.body.password);

  
        const newUser = new user(req.body);

        await newUser.save()
        .then((response)=>{
            return new Response(response, "User created successfully").Created(res);

        })
        .catch((err)=>{
            throw new APIError("User creation failed", 400);
        })  
    
 


    console.log(req.body);
    return res.json(req.body);
}

const me = async(req,res)=>{
    console.log("At me")
    return new Response(req.user).successRespone(res);
}

module.exports={
    login,
    register,
    me
}