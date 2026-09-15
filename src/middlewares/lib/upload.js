const multer= require("multer")
const path=require("path")
const fs=require("fs")
const rootDir = path.join(__dirname, "..", "..");

const filefilter=(req,file,cb)=>{
    const allowedMimeTypes=["images/jpg","images/gif","images/jpeg","images/png"]

    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(new Error("Selected type not supported"),false)
    }
    cb(null,true)
}

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        const routeDir=path.dirname(require.main.filename)
        console.log(require.main.filename)
        fs.mkdirSync(path.join(rootDir, "/public/uploads"),{recursive : true})  
        cb(null,path.join(routeDir,"/public/uploads"))
    },
    filename:function(req,file,cb){
        const extension = file.mimetype.split("/")[1]

        if(!req.savedImages) req.savedImages= [];

        const uniqueSuffix= Date.now() + '-' + Math.round(Math.random()*1E9)

        let url = `image_${uniqueSuffix}.${extension}`

        req.savedImages=[...req.savedImages,path.join(url)]


        cb(null,url);

    }
})

const upload = multer({storage,filefilter}).array("images");

module.exports=upload;