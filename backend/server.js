const express = require('express');
require('dotenv').config();
const connectToMongo = require('./db/db');
const cors = require('cors');

const app = express();

// Routes
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/note');

// Middleware
app.use(express.json());

/**
 * ✅ Read allowed origins from ENV
 * You can pass multiple URLs separated by comma
 * Example:
 * FRONTEND_URL=http://localhost:3000,https://note-app.vercel.app
 */
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
  : [];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / mobile apps (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true
}));

// DB Connection
connectToMongo();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter);

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});