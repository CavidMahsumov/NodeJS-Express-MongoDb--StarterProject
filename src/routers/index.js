const router= require("express").Router();
const upload = require("../middlewares/lib/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const auth=require("./auth.routes");
const multer = require("multer")

router.use("/auth",auth);


router.post("/upload",function(req,res){
    upload(req,res,function(err){
        if(err instanceof multer.MulterError)
            throw new APIError("An Multer error occurred while uploading the image.",err)
        else if(err)
            throw new APIError("An error occurred while uploading the image.",err)
        else
            return new Response(req.savedImage,"Upload Succesfully").successRespone(res)
    })
})

module.exports=router;