import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'DevSprint Multi-Agent Backend Engine',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DevSprint Server running on http://localhost:${PORT}`);
});
