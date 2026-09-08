class Response { 
    constructor(data=null, message=null, status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    successRespone(res){
        return res.status(200).json({
            success:true,
            data:this.data,
            message:this.message ?? "Request successful"
        })
    }

    Created(res){
        return res.status(201).json({
            success:true,
            data:this.data,
            message:this.message ?? "Request successful"
        })
    }
    Error500(res){
        return res.status(500).json({
            success:false,
            data:this.data,
            message:this.message ?? "Internal server error"
        })
    }
    Error400(res){
        return res.status(400).json({
            success:false,
            data:this.data,
            message:this.message ?? "Internal server error"
        })
    }
    Error401(res){
        return res.status(40).json({
            success:false,
            data:this.data,
            message:this.message ?? "Client not authorized"
        })
    }
    Error404(res){
        return res.status(404).json({
            success:false,
            data:this.data,
            message:this.message ?? "Resource not found"
        })
    }
    Error429(res){
        return res.status(429).json({
            success:false,
            data:this.data,
            message:this.message ?? "Too many requests"
        })
    }    


}

module.exports = Response;