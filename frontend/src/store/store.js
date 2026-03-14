import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import interviewReducer from './features/interview/interview.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        interview: interviewReducer
    }
});