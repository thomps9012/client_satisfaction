import questions from "./questions.json";
import AnswerOptions from "./components/AnswerOptions";
import Question from "./components/Question";
import ProgressBar from "./components/Progress";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OpenAnswerOption from "./components/TextAnswer";

export default function QuestionPage() {
  const [current_question, setCurrentQuestion] = useState(questions[0]);
  const [progress_percent, setProgress] = useState(0);
  const { current_question_id } = useParams();
  const question_int = parseInt(current_question_id);
  useEffect(() => {
    const next_question = questions[question_int - 1];
    const new_percent = Math.floor((question_int / 46).toFixed(2) * 100);
    setProgress(new_percent);
    setCurrentQuestion(next_question);
  }, [question_int]);

  return (
    <main className="container">
      <ProgressBar progress={progress_percent} />
      <Question current_question={current_question} />
      {current_question.open_ended ? (
        <OpenAnswerOption question_id={question_int} />
      ) : (
        <AnswerOptions question_id={question_int} />
      )}
    </main>
  );
}
