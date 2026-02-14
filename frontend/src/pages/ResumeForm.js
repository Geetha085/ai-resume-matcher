import React, { useState } from "react";
import axios from "axios";

function ResumeForm() {
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!skills.trim()) newErrors.skills = "Skills cannot be empty";
    if (!projects.trim()) newErrors.projects = "Projects cannot be empty";
    if (!education.trim()) newErrors.education = "Education cannot be empty";
    if (!experience.trim()) newErrors.experience = "Experience cannot be empty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:5000/resume/create",
        { skills, projects, education, experience },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      localStorage.setItem("resume_id", res.data.resume_id);
      alert("Resume saved successfully!");
    } catch (error) {
      alert("Error saving resume");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-950">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Create Resume</h2>

        {/* Skills */}
        <textarea
          className={`w-full border p-3 rounded mb-1 ${
            errors.skills ? "border-red-500" : ""
          }`}
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        {errors.skills && (
          <p className="text-red-500 text-sm mb-3">{errors.skills}</p>
        )}

        {/* Projects */}
        <textarea
          className={`w-full border p-3 rounded mb-1 ${
            errors.projects ? "border-red-500" : ""
          }`}
          placeholder="Projects"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />
        {errors.projects && (
          <p className="text-red-500 text-sm mb-3">{errors.projects}</p>
        )}

        {/* Education */}
        <textarea
          className={`w-full border p-3 rounded mb-1 ${
            errors.education ? "border-red-500" : ""
          }`}
          placeholder="Education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
        {errors.education && (
          <p className="text-red-500 text-sm mb-3">{errors.education}</p>
        )}

        {/* Experience */}
        <textarea
          className={`w-full border p-3 rounded mb-1 ${
            errors.experience ? "border-red-500" : ""
          }`}
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        {errors.experience && (
          <p className="text-red-500 text-sm mb-4">{errors.experience}</p>
        )}

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
}

export default ResumeForm;
