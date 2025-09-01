import express from "express"

import Project from "../models/project.js"


const router = express.Router()



router.get('/',async(req,res)=>{
    try{
        const page = parseInt(req.query.page,10)||1
        const limit = parseInt(req.query.limit,10)||6
        const {skill} = req.query

        const query ={}
        if(skill){
            query.skills={$regex:new RegExp(`${skill}`,'i')}
        }

        const skip = (page-1)*limit

        const [projects,total]= await Promise.all([
            Project.find(query)
            .sort({title:1})
            .skip(skip)
            .limit(limit)
            .lean(),
            Project.countDocuments(query)
        ])

        res.json({
            total,
            page,
            pages:Math.ceil(total/limit),
            limit,
            projects
        })

    }catch(err){
        console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error while fetching projects." });
    }
})

export default router;