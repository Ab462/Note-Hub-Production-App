import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import dotenv from "dotenv";
import cors from "cors";
import("./db.js");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'https://note-hub-production-app-client-e81qk12zz-abdul-wasays-projects.vercel.app',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
