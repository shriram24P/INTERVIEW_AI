import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiWithForm } from "../../../config/axiosinstance";

export const generateInterviewReport = createAsyncThunk(
  "interview/generateInterviewReport",
  async (data) => {
    try {
      const response = await apiWithForm.post("/interview", data);
      return response.data.interviewReport;
    } catch (error) {
      console.error("Error generating interview report: ", error);
    }
  },
);

export const getInterviewReportById = createAsyncThunk(
  "interview/getInterviewReportById",
  async (id) => {
    try {
      const response = await api.get(`/interview/report/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interview report: ", error);
    }
  },
);

export const getAllInterviewReports = createAsyncThunk(
  "interview/getAllInterviewReports",
  async () => {
    try {
      const response = await api.get("/interview");
      return response.data;
    } catch (error) {
      console.error("Error fetching all interview reports: ", error);
    }
  },
);

export const generateResumePdf = createAsyncThunk(
  "interview/generateResumePdf",
  async (interviewReportId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/interview/resume/pdf/${interviewReportId}`,
        {},
        { responseType: "blob" },
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      return true; // serializable
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
