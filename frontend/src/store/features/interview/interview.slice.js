import { createSlice } from "@reduxjs/toolkit";
import {
  generateInterviewReport,
  generateResumePdf,
  getAllInterviewReports,
  getInterviewReportById,
} from "./interview.thunk";

const initialState = {
  report: null,
  reports: [],
  loading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle generateInterviewReport
    builder.addCase(generateInterviewReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(generateInterviewReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    builder.addCase(generateInterviewReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to generate interview report";
    });

    // Handle getInterviewReportById
    builder.addCase(getInterviewReportById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getInterviewReportById.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    builder.addCase(getInterviewReportById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to get interview report";
    });

    // Handle getAllInterviewReports
    builder.addCase(getAllInterviewReports.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllInterviewReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(getAllInterviewReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to get all interview reports";
    });

    // Handle generateResumePdf
    builder.addCase(generateResumePdf.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(generateResumePdf.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(generateResumePdf.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to generate resume pdf";
    });
  },
});

export default interviewSlice.reducer;

interviewSlice.actions;
