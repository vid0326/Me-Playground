import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs:15*60*1000,
    max:200,
    standardHeaders:true,
    legacyHeaders:false,

    handler:(req,res,next,options)=>{
        res.status(options.statusCode).json({
            msg:"Too many attempt try after 15 mins please"
        })
    }
})

export default limiter