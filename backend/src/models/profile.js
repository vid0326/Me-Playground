import mongoose from "mongoose";
import './project.js'

const LinkSchema = new mongoose.Schema({
    github: String,
    linkedin: String, 
    leetcode:String
}, { _id: false });

const WorkSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date },
    description: String,
    skills: [String] 
});

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    education: [{
        institution: String,
        degree: String,
        year: Number
    }],
    
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    skills: [{
        name: String,
        level: { type: Number, min: 1, max: 10 }
    }],
    
    work: [WorkSchema],
    links: LinkSchema

}, { timestamps: true });

ProfileSchema.index({ name: "text", email: "text" });
ProfileSchema.index({ "skills.name": 1 }); 

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;