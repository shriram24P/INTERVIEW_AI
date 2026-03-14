const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173', // Your frontend URL
        credentials: true, // Allow cookies to be sent
    }
));
app.use(express.json());
app.use(cookieParser());

// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// Multer / file upload error handler
app.use((err, req, res, next) => {
    if (err && err.name === 'MulterError') {
        // Common multer errors: Unexpected field, LIMIT_FILE_SIZE, etc.
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'Uploaded file is too large'
            : err.message || 'File upload error';
        return res.status(400).json({ error: 'MulterError', message });
    }
    // pass to next error handler
    next(err);
});


module.exports = app;