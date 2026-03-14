import { createSlice } from "@reduxjs/toolkit";
import { getMe, loginUser, logoutUser, registerUser } from "./auth.thunk";

const initState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to register user";
    });

    // Handle loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to login user";
    });
    
    // handle logoutUser
    builder.addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
    state.error = action.payload || "Failed to logout user";
});

// handle getMe
builder.addCase(getMe.pending, (state) =>{
    state.loading = true;
    state.error = null;
});
builder.addCase(getMe.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload || null;
})

builder.addCase(getMe.rejected, (state, action) => {
  state.loading = false;
  state.user = null;
  state.error = action.payload || "Failed to fetch user info";
});
},

});

export default authSlice.reducer;

authSlice.actions;
