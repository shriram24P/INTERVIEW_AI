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

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">No interview report found</div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex flex-col md:flex-row">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-64 bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-700 p-4 flex md:flex-col overflow-x-auto">
        <div className="flex md:flex-col gap-2 w-full">
          <button
            onClick={() => {
              setActiveSection("technical");
              setExpandedQuestions({});
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeSection === "technical"
                ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                : "text-gray-400 hover:bg-slate-700/30"
            }`}
          >
            <Code2 size={18} />
            Technical
          </button>

          <button
            onClick={() => {
              setActiveSection("behavioral");
              setExpandedQuestions({});
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeSection === "behavioral"
                ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                : "text-gray-400 hover:bg-slate-700/30"
            }`}
          >
            <Brain size={18} />
            Behavioral
          </button>

          <button
            onClick={() => {
              setActiveSection("roadmap");
              setExpandedQuestions({});
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              activeSection === "roadmap"
                ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                : "text-gray-400 hover:bg-slate-700/30"
            }`}
          >
            <Map size={18} />
            Roadmap
          </button>

          <button
            onClick={getResumePdf}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Generating..." : "📄 AI Resume"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {activeSection === "roadmap" ? (
          <>
            <div className="mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Preparation Road Map
              </h1>
              <p className="text-sm text-gray-400">7-day plan</p>
            </div>

            <div className="relative">
              {report?.interviewReport?.preparationPlan?.map((day, idx) => (
                <div key={idx} className="flex gap-3 md:gap-6 mb-8 relative">
                  {idx !==
                    report?.interviewReport?.preparationPlan.length - 1 && (
                    <div className="absolute left-5 md:left-6 top-14 bottom-0 w-px bg-gradient-to-b from-pink-600 to-slate-700" />
                  )}

                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 border-2 border-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-pink-400 font-bold text-xs md:text-sm">
                        {day.day}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {day.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-3">{day.focus}</p>

                    <ul className="space-y-2">
                      {day.tasks?.map((task, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-300 flex gap-2"
                        >
                          <span className="text-pink-400">•</span>
                          {task}
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
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {activeSection === "technical"
                  ? "Technical Questions"
                  : "Behavioral Questions"}
              </h1>

              <p className="text-sm text-gray-400">
                {currentQuestions.length} questions
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 border border-slate-700 rounded-lg"
                >
                  <button
                    onClick={() => toggleQuestion(idx)}
                    className="w-full p-4 flex justify-between items-start gap-3"
                  >
                    <div className="flex gap-3 text-left flex-1">
                      <span className="text-pink-500 font-bold text-sm">
                        Q{idx + 1}
                      </span>

                      <span className="text-white text-sm md:text-base break-words">
                        {q.question}
                      </span>
                    </div>

                    {expandedQuestions[idx] ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {expandedQuestions[idx] && (
                    <div className="px-4 pb-4 border-t border-slate-700/50 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-pink-400 mb-1">
                          INTENTION
                        </h4>
                        <p className="text-sm text-gray-300">{q.intention}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-green-400 mb-1">
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

      {/* RIGHT PANEL */}
      <div className="w-full md:w-56 bg-slate-900/50 border-t md:border-t-0 md:border-l border-slate-700 p-4 md:p-6">
        {report?.interviewReport?.matchScore && (
          <div className="mb-8 text-center">
            <h3 className="text-xs text-gray-400 mb-4">MATCH SCORE</h3>

            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="none"
                  stroke="rgba(148,163,184,0.1)"
                  strokeWidth="4"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray={`${
                    (report?.interviewReport?.matchScore / 100) * 351.86
                  } 351.86`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg md:text-2xl font-bold text-white">
                  {report?.interviewReport?.matchScore}%
                </span>
              </div>
            </div>

            <p className="text-green-400 text-sm">Strong match for this role</p>
          </div>
        )}

        <div>
          <h3 className="text-xs text-gray-400 mb-3">SKILL GAPS</h3>

          <div className="flex flex-wrap gap-2">
            {report?.interviewReport?.skillGaps?.map((gap, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg text-xs border ${getSeverityColor(
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
