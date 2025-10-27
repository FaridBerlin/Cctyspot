import express from "express";
import connectDB from "./libs/dbConnect.js";
import cors from "cors";
import multer from "multer";
import cityRouter from "./routes/cityRouter.js";

connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL // Add your frontend URL from Render
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('.onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/cities", cityRouter);

app.use((err, req, res, next)=>{
  console.log(err);
  if (err instanceof multer.MulterError){
    return res.status(400).json({msg: "Upload error", error: err.message});
  }
  res.status(500).json({msg: "Server error!", error: err.message});
  
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
