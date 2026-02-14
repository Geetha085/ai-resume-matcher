import React, { useState } from "react";
import axios from "axios";

function MatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  // ✅ Add this function inside the component
  const toSentenceCase = (text) => {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a Job Description");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resume_id = localStorage.getItem("resume_id");

      const res = await axios.post(
        "http://127.0.0.1:5000/match/analyze",
        { resume_id, job_description: jobDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(res.data);

    } catch (error) {
      alert("Match failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-16 bg-indigo-950">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Analyze Resume
        </h2>

        {/* Job Description Input */}
        <textarea
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          onClick={handleMatch}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Analyze Match
        </button>

        {/* Result Section */}
        {result && (
          <div className="mt-8">

            {/* Match Score */}
            <h3 className="text-xl font-bold mb-2 text-center">
              Match Score: {result.match_score}%
            </h3>

            <p className="mb-4 text-center text-gray-600">
              {result.match_explanation}
            </p>

            {/* Missing Skills */}
            <h4 className="font-semibold mt-4">Missing Skills:</h4>
            <ul className="list-disc ml-6 mb-4 text-red-600">
              {Array.isArray(result.missing_skills) &&
                result.missing_skills.map((item, index) => (
                  <li key={index}>{toSentenceCase(item)}</li>
                ))}
            </ul>

            {/* Matched Skills */}
            <h4 className="font-semibold mt-4">Matched Skills:</h4>
            <ul className="list-disc ml-6 text-green-600">
              {Array.isArray(result.matched_skills) &&
                result.matched_skills.map((item, index) => (
                  <li key={index}>{toSentenceCase(item)}</li>
                ))}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}

export default MatchPage;
