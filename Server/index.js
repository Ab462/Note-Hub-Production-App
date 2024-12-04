import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import dotenv from "dotenv";
import cors from "cors";
import("./db.js");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: ["https://note-hub-production-app-client.vercel.app"],
    methods:["POST","GET"],
    credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://note-hub-production-app-client.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
