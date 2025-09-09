import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import type { Resume } from "../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResumeList = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();
const [isloading,setisloading]=useState(false);
const [isloadingfordelete,setisloadingfordelete]=useState(false)
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/resume");
      setResumes(res.data);
    } catch {
      console.error("Error fetching resumes");
    }
  };

  const handlePreview = (resume: Resume) => {
    navigate("/resume/preview", { state: { resume } });
  };

  const handleEdit = (resume: Resume) => {
    navigate("/resume/edit", { state: { resume } });
  };

  const handleDelete = async (id: string) => {
    setisloadingfordelete(true);

    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await API.delete(`/resume/${id}`);
        toast.success("resume deleted succesfully")
        setisloadingfordelete(false);
        fetchResumes();
        
      } catch (err) {
        console.error("Error deleting resume", err);
        toast.error("Failed to delete resume");
        setisloadingfordelete(false)
      }
    }
  };

  const handleDownload = async (id: string, type: "pdf" | "docx") => {
    try {
      setisloading(true)
      const res = await API.get(`/resume/${id}/download-${type}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume.${type}`);
      document.body.appendChild(link);
      link.click();
      setisloading(false);
      toast.success("resume downloaded successfully")
    } catch (err) {
      console.error("Download error", err);
      setisloading(false)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Resumes</h2>
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/resume/new")}
          >
            Create New Resume
          </button>
        </div>
        
        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No resumes yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/resume/new")}
            >
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((r) => (
              <div key={r._id} className="card bg-base-100 shadow-md p-4">
                <h3 className="font-bold text-lg">{r.personal.name}</h3>
                <p>Email: {r.personal.email}</p>
                <p>Phone: {r.personal.phone}</p>
                <p>Skills: {r.skills.flatMap(cat => cat.items).join(", ")}</p>

                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handlePreview(r)}
                  >
                    Preview
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleDownload(r._id, "pdf")}
                    disabled={isloading}
                  >
                    PDF
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleDownload(r._id, "docx")}
                    disabled={isloading}
                  >
                    DOCX
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(r._id)}
                    disabled={isloadingfordelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;