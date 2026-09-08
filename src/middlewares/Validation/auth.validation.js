const joi=require('joi');
const APIError=require('../../utils/errors');

class AuthValidation{
    constructor(){}

    static RegisterValidation =async (req,res,next)=>{
        try{
            await joi.object({
                name:joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"Name must be a string",
                    "string.empty":"Name is required",
                    "string.min":"Name must be at least 3 characters",
                    "string.max":"Name must be at most 100 characters",
                    "string.required":"Name is required"
                }),
                lastname:joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"Last Name must be a string",
                    "string.empty":"Last Name is requireddddddd",
                    "string.min":"Last Name must be at least 3 characters",
                    "string.max":"Last Name must be at most 100 characters",
                    "string.required":"Last Name is requiredddddddd"
                }), 
                email:joi.string().trim().email().required().min(3).max(100).messages({
                    "string.base":"Email must be a string",
                    "string.empty":"Email is required",
                    "string.email":"Email must be a valid email",
                    "string.required":"Email is required"
                }),
                password:joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"Password must be a string",
                    "string.empty":"Password is required",
                    "string.min":"Password must be at least 6 characters",
                    "string.max":"Password must be at most 36 characters",
                    "string.required":"Password is required"
                })
            }).validateAsync(req.body)
        }
        catch(err){
            throw new APIError(err.details[0].message);    
        }
        next();  
    }
}

module.exports=AuthValidation;