import * as dotenv from "dotenv";
dotenv.config();
import { randomUUID } from "crypto";
import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
const mongodb = process.env.MONGODB_URI;
const db_name = process.env.DB_NAME;
const client = new MongoClient(mongodb);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.post("/api/begin", async (req, res) => {
  const client_info = req.body;
  await client.connect();

  const survey_collection = client.db(db_name).collection("surveys");
  const survey_id = randomUUID();
  const db_res = await survey_collection.insertOne({
    _id: survey_id,
    ...client_info,
  });
  res.status(201).json(db_res.insertedId);
});
app.post("/api/question", async (req, res) => {
  const { interview_id, question_id, client_answer } = req.body;
  await client.connect();
  const survey_collection = client.db(db_name).collection("surveys");
  const db_res = survey_collection.findOneAndUpdate(
    { _id: interview_id },
    {
      $push: {
        answers: {
          question: question_id,
          client_answer: client_answer,
        },
      },
    }
  );
  res.json(db_res);
});
app.post("/api/end", async (req, res) => {
  const { interview_id } = req.body;
  await client.connect();
  const survey_collection = client.db(db_name).collection("surveys");
  const record = await survey_collection.findOne({ _id: interview_id });
  const only_answered = record.answers.filter(
    ({ client_answer }) =>
      client_answer != -1 && typeof client_answer != "string"
  );
  const client_score = Math.floor(
    (
      only_answered.reduce((a, b) => a + b.client_answer, 0) /
      (only_answered.length * 5)
    ).toFixed(2) * 100
  );
  const db_res = survey_collection.findOneAndUpdate(
    { _id: interview_id },
    {
      $set: {
        total_score: client_score,
        applicable_questions: only_answered.length,
      },
    }
  );
  res.json(db_res);
});
app.listen(PORT, () => console.log("Now Listening on PORT: " + PORT));
