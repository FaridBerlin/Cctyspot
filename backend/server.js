import express from "express";
import connectDB from "./libs/dbConnect.js";
import cors from "cors";
import multer from "multer";
import cityRouter from "./routes/cityRouter.js";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
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
