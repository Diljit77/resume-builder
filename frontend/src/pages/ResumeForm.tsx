import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

interface Education {
  school: string;
  degree: string;
  year: string;
  location?: string;
  gpa?: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  location?: string;
  technologies?: string[];
  achievements?: string[];
}

interface Project {
  title: string;
  description: string;
  link?: string;
  duration?: string;
  technologies?: string[];
  features?: string[];
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Language {
  name: string;
  proficiency: string;
}

const ResumeForm = () => {
  const location = useLocation();
  const { resume: editResume } = location.state || {};
  const isEditMode = !!editResume;
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ig, setIg] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [summary, setSummary] = useState("");

  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillItems, setNewSkillItems] = useState<{[key: number]: string}>({});
  const [newAchievement, setNewAchievement] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && editResume) {
      const { personal, summary, education, experience, skills, projects, certifications, languages, achievements } = editResume;
      
      setName(personal.name || "");
      setPhone(personal.phone || "");
      setEmail(personal.email || "");
      setAddress(personal.address || "");
      setIg(personal.ig || "");
      setLinkedin(personal.linkedin || "");
      setGithub(personal.github || "");
      setPortfolio(personal.portfolio || "");
      setSummary(summary || "");
      
      setEducation(education || []);
      setExperience(experience || []);
      setProjects(projects || []);
      setCertifications(certifications || []);
      setSkillCategories(skills || []);
      setLanguages(languages || []);
      setAchievements(achievements || []);
    }
  }, [isEditMode, editResume]);


  const handleAddEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };
  const handleEducationChange = (i: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[i][field] = value;
    setEducation(updated);
  };
  const handleRemoveEducation = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };


  const handleAddExperience = () => {
    setExperience([...experience, { company: "", role: "", duration: "", description: "" }]);
  };
  const handleExperienceChange = (i: number, field: keyof Experience, value: string) => {
    const updated = [...experience];
    updated[i][field] = value as never;
    setExperience(updated);
  };
  const handleRemoveExperience = (index: number) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperience(updated);
  };
  const handleAddExperienceTechnology = (i: number) => {
    const updated = [...experience];
    if (!updated[i].technologies) updated[i].technologies = [];
    updated[i].technologies!.push("");
    setExperience(updated);
  };
  const handleExperienceTechnologyChange = (i: number, techIndex: number, value: string) => {
    const updated = [...experience];
    updated[i].technologies![techIndex] = value;
    setExperience(updated);
  };
  const handleRemoveExperienceTechnology = (i: number, techIndex: number) => {
    const updated = [...experience];
    updated[i].technologies!.splice(techIndex, 1);
    setExperience(updated);
  };
  const handleAddExperienceAchievement = (i: number) => {
    const updated = [...experience];
    if (!updated[i].achievements) updated[i].achievements = [];
    updated[i].achievements!.push("");
    setExperience(updated);
  };
  const handleExperienceAchievementChange = (i: number, achievementIndex: number, value: string) => {
    const updated = [...experience];
    updated[i].achievements![achievementIndex] = value;
    setExperience(updated);
  };
  const handleRemoveExperienceAchievement = (i: number, achievementIndex: number) => {
    const updated = [...experience];
    updated[i].achievements!.splice(achievementIndex, 1);
    setExperience(updated);
  };

  
  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };
  const handleProjectChange = (i: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[i][field] = value as never;
    setProjects(updated);
  };
  const handleRemoveProject = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };
  const handleAddProjectTechnology = (i: number) => {
    const updated = [...projects];
    if (!updated[i].technologies) updated[i].technologies = [];
    updated[i].technologies!.push("");
    setProjects(updated);
  };
  const handleProjectTechnologyChange = (i: number, techIndex: number, value: string) => {
    const updated = [...projects];
    updated[i].technologies![techIndex] = value;
    setProjects(updated);
  };
  const handleRemoveProjectTechnology = (i: number, techIndex: number) => {
    const updated = [...projects];
    updated[i].technologies!.splice(techIndex, 1);
    setProjects(updated);
  };
  const handleAddProjectFeature = (i: number) => {
    const updated = [...projects];
    if (!updated[i].features) updated[i].features = [];
    updated[i].features!.push("");
    setProjects(updated);
  };
  const handleProjectFeatureChange = (i: number, featureIndex: number, value: string) => {
    const updated = [...projects];
    updated[i].features![featureIndex] = value;
    setProjects(updated);
  };
  const handleRemoveProjectFeature = (i: number, featureIndex: number) => {
    const updated = [...projects];
    updated[i].features!.splice(featureIndex, 1);
    setProjects(updated);
  };

 
  const handleAddCertification = () => {
    setCertifications([...certifications, { title: "", issuer: "", year: "" }]);
  };
  const handleCertificationChange = (i: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[i][field] = value;
    setCertifications(updated);
  };
  const handleRemoveCertification = (index: number) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  const handleAddSkillCategory = () => {
    if (newSkillCategory.trim()) {
      setSkillCategories([...skillCategories, { category: newSkillCategory.trim(), items: [] }]);
      setNewSkillCategory("");
    }
  };
  
  const handleAddSkillItem = (categoryIndex: number) => {
    const skillItem = newSkillItems[categoryIndex] || "";
    if (skillItem.trim()) {
      const updated = [...skillCategories];
      updated[categoryIndex].items.push(skillItem.trim());
      setSkillCategories(updated);
      
      const updatedNewSkillItems = {...newSkillItems};
      updatedNewSkillItems[categoryIndex] = "";
      setNewSkillItems(updatedNewSkillItems);
    }
  };
  
  const handleSkillItemInputChange = (categoryIndex: number, value: string) => {
    setNewSkillItems({...newSkillItems, [categoryIndex]: value});
  };
  

  
  const handleRemoveSkillCategory = (categoryIndex: number) => {
    const updated = [...skillCategories];
    updated.splice(categoryIndex, 1);
    setSkillCategories(updated);
 
    const updatedNewSkillItems = {...newSkillItems};
    delete updatedNewSkillItems[categoryIndex];
    setNewSkillItems(updatedNewSkillItems);
  };
  
  const handleRemoveSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...skillCategories];
    updated[categoryIndex].items.splice(itemIndex, 1);
    setSkillCategories(updated);
  };

  // Language handlers
  const handleAddLanguage = () => {
    setLanguages([...languages, { name: "", proficiency: "" }]);
  };
  const handleLanguageChange = (i: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[i][field] = value;
    setLanguages(updated);
  };
  const handleRemoveLanguage = (index: number) => {
    const updated = [...languages];
    updated.splice(index, 1);
    setLanguages(updated);
  };

  // Achievement handlers
  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };
  const handleRemoveAchievement = (index: number) => {
    const updated = [...achievements];
    updated.splice(index, 1);
    setAchievements(updated);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resumeData = {
        personal: { name, phone, email, address, ig, linkedin, github, portfolio },
        summary,
        education,
        experience,
        skills: skillCategories,
        projects,
        certifications,
        languages,
        achievements,
      };

      if (isEditMode) {
        await API.put(`/resume/${editResume._id}`, resumeData);
      } else {
        await API.post("/resume", resumeData);
      }
      
      navigate("/resumes");
    } catch {
      alert(`Error ${isEditMode ? 'updating' : 'creating'} resume`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isEditMode ? 'Edit Resume' : 'Create Resume'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="card bg-base-200 p-4">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="input input-bordered w-full mb-2" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full mb-2" required />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="input input-bordered w-full mb-2" required />
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="input input-bordered w-full mb-2" />
            <input value={ig} onChange={(e) => setIg(e.target.value)} placeholder="Instagram" className="input input-bordered w-full mb-2" />
            <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn" className="input input-bordered w-full mb-2" />
            <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub" className="input input-bordered w-full mb-2" />
            <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Portfolio" className="input input-bordered w-full" />
          </div>

          {/* Summary */}
          <div className="card bg-base-200 p-4">
            <h3 className="text-xl font-semibold mb-2">Professional Summary</h3>
            <textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              placeholder="Brief professional summary" 
              className="textarea textarea-bordered w-full h-24" 
            />
          </div>

          {/* Education */}
          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Education</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={handleAddEducation}>➕ Add</button>
            </div>
            {education.map((edu, i) => (
              <div key={i} className="space-y-2 mb-4 border-b border-gray-600 pb-4 relative">
                <button 
                  type="button" 
                  className="absolute top-0 right-0 btn btn-xs btn-error"
                  onClick={() => handleRemoveEducation(i)}
                >
                  ×
                </button>
                <input value={edu.school} onChange={(e) => handleEducationChange(i, "school", e.target.value)} placeholder="School/University" className="input input-bordered w-full" />
                <input value={edu.degree} onChange={(e) => handleEducationChange(i, "degree", e.target.value)} placeholder="Degree/Certificate" className="input input-bordered w-full" />
                <input value={edu.year} onChange={(e) => handleEducationChange(i, "year", e.target.value)} placeholder="Year (e.g., 2020-2024)" className="input input-bordered w-full" />
                <input value={edu.location || ""} onChange={(e) => handleEducationChange(i, "location", e.target.value)} placeholder="Location" className="input input-bordered w-full" />
                <input value={edu.gpa || ""} onChange={(e) => handleEducationChange(i, "gpa", e.target.value)} placeholder="GPA/Score" className="input input-bordered w-full" />
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Experience</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={handleAddExperience}>➕ Add</button>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="space-y-2 mb-4 border-b border-gray-600 pb-4 relative">
                <button 
                  type="button" 
                  className="absolute top-0 right-0 btn btn-xs btn-error"
                  onClick={() => handleRemoveExperience(i)}
                >
                  ×
                </button>
                <input value={exp.company} onChange={(e) => handleExperienceChange(i, "company", e.target.value)} placeholder="Company" className="input input-bordered w-full" />
                <input value={exp.role} onChange={(e) => handleExperienceChange(i, "role", e.target.value)} placeholder="Role/Position" className="input input-bordered w-full" />
                <input value={exp.duration} onChange={(e) => handleExperienceChange(i, "duration", e.target.value)} placeholder="Duration (e.g., May 2023 - August 2023)" className="input input-bordered w-full" />
                <input value={exp.location || ""} onChange={(e) => handleExperienceChange(i, "location", e.target.value)} placeholder="Location" className="input input-bordered w-full" />
                <textarea value={exp.description} onChange={(e) => handleExperienceChange(i, "description", e.target.value)} placeholder="Description of responsibilities and achievements" className="textarea textarea-bordered w-full" rows={3} />
                
                <div className="pl-4">
                  <div className="flex justify-between items-center mt-2">
                    <h4 className="font-semibold">Technologies Used</h4>
                    <button type="button" className="btn btn-xs btn-outline" onClick={() => handleAddExperienceTechnology(i)}>➕ Add Technology</button>
                  </div>
                  {exp.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2 mb-2">
                      <input 
                        value={tech} 
                        onChange={(e) => handleExperienceTechnologyChange(i, techIndex, e.target.value)} 
                        placeholder="Technology" 
                        className="input input-bordered flex-grow" 
                      />
                      <button 
                        type="button" 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveExperienceTechnology(i, techIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pl-4">
                  <div className="flex justify-between items-center mt-2">
                    <h4 className="font-semibold">Key Achievements</h4>
                    <button type="button" className="btn btn-xs btn-outline" onClick={() => handleAddExperienceAchievement(i)}>➕ Add Achievement</button>
                  </div>
                  {exp.achievements?.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2 mb-2">
                      <input 
                        value={achievement} 
                        onChange={(e) => handleExperienceAchievementChange(i, achievementIndex, e.target.value)} 
                        placeholder="Achievement" 
                        className="input input-bordered flex-grow" 
                      />
                      <button 
                        type="button" 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveExperienceAchievement(i, achievementIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Projects</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={handleAddProject}>➕ Add</button>
            </div>
            {projects.map((p, i) => (
              <div key={i} className="space-y-2 mb-4 border-b border-gray-600 pb-4 relative">
                <button 
                  type="button" 
                  className="absolute top-0 right-0 btn btn-xs btn-error"
                  onClick={() => handleRemoveProject(i)}
                >
                  ×
                </button>
                <input value={p.title} onChange={(e) => handleProjectChange(i, "title", e.target.value)} placeholder="Project Title" className="input input-bordered w-full" />
                <input value={p.duration || ""} onChange={(e) => handleProjectChange(i, "duration", e.target.value)} placeholder="Duration (e.g., Jan 2023 - Mar 2023)" className="input input-bordered w-full" />
                <textarea value={p.description} onChange={(e) => handleProjectChange(i, "description", e.target.value)} placeholder="Project Description" className="textarea textarea-bordered w-full" rows={3} />
                <input value={p.link || ""} onChange={(e) => handleProjectChange(i, "link", e.target.value)} placeholder="Project Link/URL" className="input input-bordered w-full" />
                
                <div className="pl-4">
                  <div className="flex justify-between items-center mt-2">
                    <h4 className="font-semibold">Technologies Used</h4>
                    <button type="button" className="btn btn-xs btn-outline" onClick={() => handleAddProjectTechnology(i)}>➕ Add Technology</button>
                  </div>
                  {p.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2 mb-2">
                      <input 
                        value={tech} 
                        onChange={(e) => handleProjectTechnologyChange(i, techIndex, e.target.value)} 
                        placeholder="Technology" 
                        className="input input-bordered flex-grow" 
                      />
                      <button 
                        type="button" 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveProjectTechnology(i, techIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pl-4">
                  <div className="flex justify-between items-center mt-2">
                    <h4 className="font-semibold">Key Features</h4>
                    <button type="button" className="btn btn-xs btn-outline" onClick={() => handleAddProjectFeature(i)}>➕ Add Feature</button>
                  </div>
                  {p.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2 mb-2">
                      <input 
                        value={feature} 
                        onChange={(e) => handleProjectFeatureChange(i, featureIndex, e.target.value)} 
                        placeholder="Feature" 
                        className="input input-bordered flex-grow" 
                      />
                      <button 
                        type="button" 
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveProjectFeature(i, featureIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Certifications</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={handleAddCertification}>➕ Add</button>
            </div>
            {certifications.map((c, i) => (
              <div key={i} className="space-y-2 mb-4 border-b border-gray-600 pb-4 relative">
                <button 
                  type="button" 
                  className="absolute top-0 right-0 btn btn-xs btn-error"
                  onClick={() => handleRemoveCertification(i)}
                >
                  ×
                </button>
                <input value={c.title} onChange={(e) => handleCertificationChange(i, "title", e.target.value)} placeholder="Certification Title" className="input input-bordered w-full" />
                <input value={c.issuer} onChange={(e) => handleCertificationChange(i, "issuer", e.target.value)} placeholder="Issuing Organization" className="input input-bordered w-full" />
                <input value={c.year} onChange={(e) => handleCertificationChange(i, "year", e.target.value)} placeholder="Year" className="input input-bordered w-full" />
                <input value={c.credentialId || ""} onChange={(e) => handleCertificationChange(i, "credentialId", e.target.value)} placeholder="Credential ID (if any)" className="input input-bordered w-full" />
                <input value={c.credentialUrl || ""} onChange={(e) => handleCertificationChange(i, "credentialUrl", e.target.value)} placeholder="Credential URL (if any)" className="input input-bordered w-full" />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="card bg-base-200 p-4">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <div className="flex gap-2 mb-4">
              <input 
                value={newSkillCategory} 
                onChange={(e) => setNewSkillCategory(e.target.value)} 
                placeholder="Enter a skill category (e.g., Programming Languages)" 
                className="input input-bordered flex-grow" 
              />
              <button type="button" className="btn btn-outline" onClick={handleAddSkillCategory}>Add Category</button>
            </div>
            
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-4 p-3 bg-base-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{category.category}</h4>
                  <button 
                    type="button" 
                    className="btn btn-xs btn-error"
                    onClick={() => handleRemoveSkillCategory(catIndex)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <input 
                    value={newSkillItems[catIndex] || ""} 
                    onChange={(e) => handleSkillItemInputChange(catIndex, e.target.value)} 
                    placeholder="Enter a skill" 
                    className="input input-bordered flex-grow" 
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => handleAddSkillItem(catIndex)}
                  >
                    Add Skill
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="badge badge-primary badge-lg flex items-center gap-1">
                      {item}
                      <button 
                        type="button" 
                        className="ml-1 text-xs"
                        onClick={() => handleRemoveSkillItem(catIndex, itemIndex)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Languages</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={handleAddLanguage}>➕ Add</button>
            </div>
            {languages.map((lang, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 mb-4 relative">
                <button 
                  type="button" 
                  className="absolute top-0 right-0 btn btn-xs btn-error"
                  onClick={() => handleRemoveLanguage(i)}
                >
                  ×
                </button>
                <input 
                  value={lang.name} 
                  onChange={(e) => handleLanguageChange(i, "name", e.target.value)} 
                  placeholder="Language" 
                  className="input input-bordered" 
                />
                <input 
                  value={lang.proficiency} 
                  onChange={(e) => handleLanguageChange(i, "proficiency", e.target.value)} 
                  placeholder="Proficiency (e.g., Native, Fluent)" 
                  className="input input-bordered" 
                />
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="card bg-base-200 p-4">
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <div className="flex gap-2 mb-4">
              <input 
                value={newAchievement} 
                onChange={(e) => setNewAchievement(e.target.value)} 
                placeholder="Enter an achievement" 
                className="input input-bordered flex-grow" 
              />
              <button type="button" className="btn btn-outline" onClick={handleAddAchievement}>Add</button>
            </div>
            
            <div className="space-y-2">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-base-300 rounded">
                  <span>• {a}</span>
                  <button 
                    type="button" 
                    className="btn btn-xs btn-error"
                    onClick={() => handleRemoveAchievement(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button type="submit" className="btn btn-primary flex-1">
              {isEditMode ? 'Update Resume' : 'Save Resume'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate("/resumes")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;