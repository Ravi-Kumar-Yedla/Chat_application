import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js'; // `app` from socket.js (usually Express instance)
import cors from 'cors';

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;



// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions ={
  origin:"https://chat-application-ogxl.onrender.com",
  credentials:true
}
app.use(cors(corsOptions))
// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});

