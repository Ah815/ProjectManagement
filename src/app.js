import express from "express";
import cors from "cors";
import healthCheck from './routes/healthCheck.js';
import auth from './routes/auth.js';
const app = express();

// basic configurations
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/auth", auth);


// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});




export default app;
