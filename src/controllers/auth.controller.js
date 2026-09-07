require('express-async-errors');
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const login = async (req,res)=>{
    console.log(req.body);
    return res.json(req.body);
}
const register=async (req,res)=>{
    const {email} = req.body;
    
    const userExists = await user.findOne({email});

    if(userExists){
        throw new APIError("User already exists !", 400);
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log("Hashed password: ", req.body.password);

    try{
        const newUser = new user(req.body);

        await newUser.save()
        .then((response)=>{
            return res.staus(201).json({
                success:true,
                data:response,
                message:"User created successfully"
            })
        })
        .catch((err)=>{
            console.log(err);
        })  
    }
    catch(err){
        console.log(err);
    }


    console.log(req.body);
    return res.json(req.body);
}

module.exports={
    login,
    register
}