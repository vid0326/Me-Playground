import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    title:{type:String , required:true,index:true},
    description:{type:String , default:""},
    links:[{type:String}],
    skills:[{type:String, index:true}]
},{_id:true})

const Project = mongoose.model('Project', ProjectSchema);
export default Project;