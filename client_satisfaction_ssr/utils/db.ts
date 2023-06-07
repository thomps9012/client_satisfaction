import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";
import { ClientInfo, FilteredClientAnswer, QuestionInfo, ClientSurvey, AnswerInfo, ClientQuestionAnswer } from "./types";

const client = new MongoClient(process.env.MONGODB_URI as string);

export const getQuestion = async (question_id: string) => {
  await client.connect()
  const question_coll = client.db(process.env.MONGODB_DB).collection<QuestionInfo>("questions");
  const question = await question_coll.findOne({ _id: parseInt(question_id) });
  return question;
};

export const getAnswerOptions = async () => {
  await client.connect();
  const answer_options_coll = client.db(process.env.MONGODB_DB).collection<AnswerInfo>("answers");
  const answer_options = await answer_options_coll.find().toArray();
  return answer_options;
};

export const saveAnswer = async (interview_info: ClientQuestionAnswer) => {
  await client.connect();
  const survey_coll = client.db(process.env.MONGODB_DB).collection<ClientSurvey>("surveys");
  const { interview_id, question_id, answer_value } = interview_info;
  const res = await survey_coll.findOneAndUpdate(
    {
      _id: interview_id,
    },
    {
      $push: {
        answers: {
          question: question_id,
          client_answer: answer_value,
        },
      },
    }
  );
  return res.ok;
};

export const beginSurvey = async (client_info: ClientInfo) => {
  await client.connect();
  const survey_coll = client.db(process.env.MONGODB_DB).collection<ClientSurvey | ClientInfo>("surveys");
  const survey_id = randomUUID();
  const survey = {
    _id: survey_id,
    ...client_info,
  };
  const res = await survey_coll.insertOne(survey);
  return res.insertedId;
};

const calculate_score = async (answered_questions: FilteredClientAnswer[]) => {
  const total_score = answered_questions.reduce((a, b) => a + b.client_answer, 0) /
    (answered_questions.length * 5)
  return Math.round(parseFloat(total_score.toFixed(2)) * 100)
};

export const completeSurvey = async (interview_id: string) => {
  await client.connect();
  const survey_coll = client.db(process.env.MONGODB_DB).collection<ClientSurvey>("surveys");
  const survey = await survey_coll.findOne({ _id: interview_id });
  const answers = survey?.answers;
  if (!answers) {
    return 0
  }
  const only_answered = answers.filter(
    ({ client_answer }: { client_answer: number | string }) =>
      client_answer != -1 && typeof client_answer != "string"
  ) as FilteredClientAnswer[]
  const total_score = await calculate_score(only_answered);
  const res = await survey_coll.findOneAndUpdate(
    {
      _id: interview_id,
    },
    {
      $set: {
        total_score: total_score,
        applicable_questions: only_answered.length,
      },
    }
  );
  return res.ok;
};

export const closeClient = async () => client.close();