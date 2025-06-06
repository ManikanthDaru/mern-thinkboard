import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();

// What is an endpoint?
// An endpoint is a combination of URL + HTTP method that let's the client
// interact with a specific resource
app.use(cors({
  origin: "http://localhost:5173"
}));
// middleware - will parse JSON data
app.use(express.json());

// a simple custom middleware 
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// })
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("App is running at port: " + PORT);
  });
})
