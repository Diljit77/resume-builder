import { useLocation, useNavigate } from "react-router-dom";
import type { Resume } from "../types";
import API from "../api/axios";

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resume }: { resume: Resume } = location.state || {};

  if (!resume) return <p>No resume data</p>;

  const handleDownload = async (type: "pdf" | "docx") => {
    try {
      const res = await API.get(`/resume/${resume._id}/download-${type}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume.${type}`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download error", err);
    }
  };

  const handleClose = () => {
    navigate("/resumes");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Resume Preview</h1>
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleDownload("pdf")}
          >
            Download PDF
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleDownload("docx")}
          >
            Download DOCX
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={handleClose}
            title="Close preview"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{resume.personal.name}</h1>
        <p>{resume.personal.email} | {resume.personal.phone}</p>
        {resume.personal.address && <p>{resume.personal.address}</p>}
        <div className="flex gap-2 mt-2">
          {resume.personal.linkedin && (
            <a href={resume.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>
          )}
          {resume.personal.github && (
            <a href={resume.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
          )}
          {resume.personal.portfolio && (
            <a href={resume.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Portfolio</a>
          )}
        </div>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Summary</h2>
          <p className="mt-2">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Education</h2>
          {resume.education.map((edu, i) => (
            <div key={i} className="mt-2">
              <div className="flex justify-between">
                <strong>{edu.degree}</strong>
                <span>{edu.year}</span>
              </div>
              <div>{edu.school}{edu.location && `, ${edu.location}`}</div>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Experience</h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mt-3">
              <div className="flex justify-between">
                <strong>{exp.role}</strong>
                <span>{exp.duration}</span>
              </div>
              <div>{exp.company}{exp.location && `, ${exp.location}`}</div>
              <p className="text-sm mt-1">{exp.description}</p>
              
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-1">
                  <strong>Technologies:</strong> {exp.technologies.join(", ")}
                </div>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="mt-1">
                  <strong>Achievements:</strong>
                  <ul className="list-disc pl-5">
                    {exp.achievements.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Projects</h2>
          {resume.projects.map((p, i) => (
            <div key={i} className="mt-3">
              <div className="flex justify-between">
                <strong>{p.title}</strong>
                {p.duration && <span>{p.duration}</span>}
              </div>
              <p className="text-sm">{p.description}</p>
              
              {p.technologies && p.technologies.length > 0 && (
                <div className="mt-1">
                  <strong>Technologies:</strong> {p.technologies.join(", ")}
                </div>
              )}
              
              {p.features && p.features.length > 0 && (
                <div className="mt-1">
                  <strong>Features:</strong>
                  <ul className="list-disc pl-5">
                    {p.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {p.link && (
                <div className="mt-1">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Project</a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Skills</h2>
          {resume.skills.map((skillCategory, i) => (
            <div key={i} className="mt-2">
              <strong>{skillCategory.category}:</strong>
              <span> {skillCategory.items.join(", ")}</span>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Certifications</h2>
          {resume.certifications.map((c, i) => (
            <div key={i} className="mt-2">
              <strong>{c.title}</strong> - {c.issuer} ({c.year})
              {c.credentialId && <div>Credential ID: {c.credentialId}</div>}
              {c.credentialUrl && (
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Credential</a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Languages</h2>
          {resume.languages.map((lang, i) => (
            <div key={i}>
              {lang.name} ({lang.proficiency})
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Achievements</h2>
          <ul className="list-disc pl-5">
            {resume.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}



    </div>
  );
};

export default ResumePreview;