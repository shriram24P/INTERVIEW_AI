import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Code2, Brain, Map } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  generateResumePdf,
  getInterviewReportById,
} from "../../../store/features/interview/interview.thunk";

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const { report, loading } = useSelector((state) => state.interview);
  const dispatch = useDispatch();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      dispatch(getInterviewReportById(interviewId));
    }
  }, [dispatch, interviewId]);


  // Show error or no data state
  if (!report) {
    return (
      <div className="h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">No interview report found</div>
      </div>
    );
  }

  // Now it's safe to access properties with optional chaining as backup
  const currentQuestions =
    activeSection === "technical"
      ? report?.interviewReport?.technicalQuestions || []
      : report?.interviewReport?.behavioralQuestions || [];

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-600/20 text-red-300 border-red-600/30";
      case "medium":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
      case "low":
        return "bg-green-600/20 text-green-300 border-green-600/30";
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-600/30";
    }
  };

  const getResumePdf = async () => {
    await dispatch(generateResumePdf(interviewId));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-58 bg-slate-900/50 border-r border-slate-700 p-4 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-4">
            SECTIONS
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveSection("technical");
                setExpandedQuestions({});
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeSection === "technical"
                  ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                  : "text-gray-400 hover:bg-slate-700/30"
              }`}
            >
              <Code2 size={18} />
              Technical Questions
            </button>
            <button
              onClick={() => {
                setActiveSection("behavioral");
                setExpandedQuestions({});
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeSection === "behavioral"
                  ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                  : "text-gray-400 hover:bg-slate-700/30"
              }`}
            >
              <Brain size={18} />
              Behavioral Questions
            </button>
            <button
              onClick={() => {
                setActiveSection("roadmap");
                setExpandedQuestions({});
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeSection === "roadmap"
                  ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                  : "text-gray-400 hover:bg-slate-700/30"
              }`}
            >
              <Map size={18} />
              Road Map
            </button>
            <button
              onClick={getResumePdf}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2
    ${
      loading
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-pink-600 hover:bg-pink-700"
    }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Generating...
                </>
              ) : (
               <span>📄 Download AI Resume</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 border-r border-slate-700 p-6 overflow-y-auto">
        {activeSection === "roadmap" ? (
          <>
            {/* Roadmap Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">
                Preparation Road Map
              </h1>
              <p className="text-sm text-gray-400">7-day plan</p>
            </div>

            {/* Timeline - Add null check */}
            <div className="relative">
              {report?.interviewReport?.preparationPlan &&
                report?.interviewReport?.preparationPlan.map((day, idx) => (
                  <div key={idx} className="flex gap-6 mb-8 relative">
                    {/* Vertical Line */}
                    {idx !==
                      report?.interviewReport?.preparationPlan.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-pink-600 to-slate-700" />
                    )}

                    {/* Day Circle */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-slate-900 border-2 border-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-pink-400 font-bold text-sm">
                          Day {day.day}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {day.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{day.focus}</p>

                      {/* Tasks */}
                      <ul className="space-y-2">
                        {day.tasks &&
                          day.tasks.map((task, taskIdx) => (
                            <li
                              key={taskIdx}
                              className="text-sm text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-pink-400 mt-1">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">
                {activeSection === "technical"
                  ? "Technical Questions"
                  : "Behavioral Questions"}
              </h1>
              <p className="text-sm text-gray-400">
                {currentQuestions.length} questions
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {currentQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
                >
                  {/* Question Header - Always Visible */}
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full p-4 flex items-start justify-between gap-3 hover:bg-slate-700/20 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 text-left min-w-0">
                      <span className="text-pink-500 font-bold text-sm flex-shrink-0">
                        Q{idx + 1}
                      </span>
                      <span className="text-white text-sm font-medium leading-relaxed line-clamp-2">
                        {q.question}
                      </span>
                    </div>
                    <div className="flex-shrink-0 text-gray-400 mt-0.5">
                      {expandedQuestions[idx] ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                  </button>

                  {/* Question Details - Expandable */}
                  {expandedQuestions[idx] && (
                    <div className="px-4 pb-4 pt-0 border-t border-slate-700/50 space-y-4">
                      {/* Intention */}
                      <div>
                        <h4 className="text-xs font-bold bg-pink-600/20 text-pink-400 border-pink-600/30 tracking-wider mt-3 mb-2 max-w-1/9 px-1.5 rounded-xs">
                          INTENTION
                        </h4>
                        <p className="text-sm text-gray-300">{q.intention}</p>
                      </div>

                      {/* Model Answer */}
                      <div>
                        <h4 className="text-xs font-bold bg-green-600/20 text-green-300 border-green-600/30 max-w-1/6 px-2 rounded-sm tracking-wider mb-2 ">
                          MODEL ANSWER
                        </h4>
                        <p className="text-sm text-gray-300">{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-56 bg-slate-900/50 border-l border-slate-700 p-6 flex flex-col">
        {/* Match Score - Add null check */}
        {report?.interviewReport?.matchScore && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-6">
              MATCH SCORE
            </h3>

            <div className="flex flex-col items-center justify-center">
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mb-4">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {/* Background Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth="4"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray={`${(report?.interviewReport?.matchScore / 100) * 351.86} 351.86`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {`${report?.interviewReport?.matchScore} %`}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-green-400 font-medium text-center">
                Strong match for this role
              </p>
            </div>
          </div>
        )}

        {/* Skill Gaps - Add null check */}
        <div className="flex-1">
          <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-4">
            SKILL GAPS
          </h3>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {report?.interviewReport?.skillGaps &&
              report?.interviewReport?.skillGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className={`inline-block px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${getSeverityColor(
                    gap.severity,
                  )}`}
                >
                  {gap.skill}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
