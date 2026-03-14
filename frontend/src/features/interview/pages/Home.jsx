import React, { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { generateInterviewReport, getAllInterviewReports } from "../../../store/features/interview/interview.thunk";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const isLoading = useSelector((state) => state.interview.loading);
  const reports = useSelector((state) => state.interview.reports);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getAllInterviewReports());
  },[dispatch]);

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleGenerateStrategy = async () => {
    if (!resume && !selfDescription) {
      toast.error("Please upload your resume or provide a self-description.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const resultAction = await dispatch(generateInterviewReport(formData));

    if (generateInterviewReport.fulfilled.match(resultAction)) {
      const interviewId = resultAction.payload._id;
      toast.success("Interview plan generated successfully!");
      navigate(`/interview/${interviewId}`);
    } else {
      // Handle error case
      toast.error("Failed to generate interview plan. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500/20";
    if (score >= 60) return "bg-yellow-500/20";
    if (score >= 40) return "bg-orange-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-start justify-center px-4 py-6 overflow-y-auto">
      {/* Main Container */}
      <div className="max-w-6xl w-full">
        {/* Header with Generate Strategy Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              Create Your Custom{" "}
              <span className="text-pink-500">Interview Plan</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-2xl">
              Let our AI analyze the job requirements and your unique profile to
              build a winning strategy.
            </p>
          </div>
          
          {/* Generate Strategy Button in Header */}
          <div className="flex items-center gap-3">
            <div className="text-gray-500 text-sm whitespace-nowrap hidden sm:block">
              <span>⚡</span> Takes ~30s
            </div>
            <button
              onClick={handleGenerateStrategy}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-lg hover:shadow-pink-500/50 text-sm whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚡</span>
                  AI is thinking...
                </span>
              ) : (
                <span>⭐ Generate Strategy</span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Left Column - Job Description */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 bg-pink-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">📋</span>
                </div>
                <h2 className="text-sm font-semibold text-white truncate">
                  Target Job Description
                </h2>
              </div>
              <span className="bg-pink-600/20 text-pink-400 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2">
                REQUIRED
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.slice(0, 5000))}
              placeholder="Paste job description here..."
              className="w-full flex-1 bg-slate-900/80 border border-slate-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 resize-none"
            />
            <div className="mt-1.5 text-xs text-gray-400 text-right">
              {jobDescription.length} / 5000
            </div>
          </div>

          {/* Right Column - User Profile */}
          <div className="space-y-3 flex flex-col h-[450px]">
            {/* Profile Header */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">👤</span>
                </div>
                <h2 className="text-sm font-semibold text-white">
                  Your Profile
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {/* Resume Upload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-200 font-medium text-sm">
                      Upload Resume
                    </label>
                    <span className="bg-pink-600/20 text-pink-400 text-xs font-bold px-2.5 py-1 rounded-full">
                      BEST
                    </span>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-pink-500 transition-colors"
                  >
                    <input
                      type="file"
                      id="resume-upload"
                      onChange={handleResumeUpload}
                      className="hidden"
                      accept=".pdf"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-pink-500 text-3xl">📄</div>
                        <p className="text-white font-medium text-sm">
                          Click or drag & drop
                        </p>
                        <p className="text-gray-400 text-xs">PDF (Max 3MB)</p>
                      </div>
                    </label>
                  </div>

                  {resume && (
                    <div className="mt-1.5 text-xs text-green-400 truncate">
                      ✓ {resume.name}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-slate-700"></div>
                  <span className="text-gray-400 text-xs font-medium">OR</span>
                  <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Self Description */}
                <div className="flex flex-col flex-1 min-h-0">
                  <label className="text-gray-200 font-medium text-sm mb-2">
                    Quick Self-Description
                  </label>
                  <textarea
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Briefly describe your experience and skills..."
                    className="w-full bg-slate-900/80 border border-slate-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 resize-none h-28"
                  />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-3 flex gap-2">
              <div className="text-blue-400 text-sm flex-shrink-0">ℹ️</div>
              <p className="text-blue-200 text-xs leading-relaxed">
                <span className="font-semibold">Resume</span> or{" "}
                <span className="font-semibold">Description</span> required. 
                For best results, provide both!
              </p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        {reports?.interviewReports && reports?.interviewReports?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span>📊</span> Your Previous Reports
              <span className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded-full">
                {reports?.interviewReports?.length} total
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {reports?.interviewReports?.map((report) => (
                <div
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 cursor-pointer hover:border-pink-500 hover:bg-slate-800/70 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-white line-clamp-2 flex-1">
                      {report.title || "Untitled Report"}
                    </h3>
                    {report.matchScore !== undefined && (
                      <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getScoreBgColor(report.matchScore)} ${getScoreColor(report.matchScore)}`}>
                        {report.matchScore}%
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span>📅</span> {formatDate(report.createdAt)}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <span className="text-pink-400 text-xs hover:text-pink-300 transition-colors flex items-center gap-1">
                      View Report <span className="text-base">→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;