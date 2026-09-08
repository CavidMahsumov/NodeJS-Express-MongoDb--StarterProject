require('express-async-errors');
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');
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

module.exports={
    login,
    register
}