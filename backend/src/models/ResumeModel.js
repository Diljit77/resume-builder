import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    personal: {
      name: String,
      email: String,
      phone: String,
      address: String,
      ig: String,
      linkedin: String,
      github: String,
      portfolio: String,
    },
    summary: { type: String },  
    education: [{
      school: String, 
      degree: String, 
      year: String,
      location: String,
      gpa: String
    }],
    experience: [{
      company: String, 
      role: String, 
      duration: String, 
      description: String,
      location: String,
      technologies: [String],
      achievements: [String]
    }],
    skills: [{
      category: String,
      items: [String]
    }],
    projects: [{
      title: String, 
      description: String, 
      link: String,
      duration: String,
      technologies: [String],
      features: [String]
    }],
    certifications: [{ 
      title: String, 
      issuer: String, 
      year: String,
      credentialId: String,
      credentialUrl: String
    }],
    languages: [{
      name: String,
      proficiency: String
    }],        
    achievements: [String],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;