import { useNavigate } from "react-router-dom";
import axios from "axios";
const answer_options = [
  {
    id: 1,
    text: "Strongly Disagree",
    value: 1,
  },
  {
    id: 2,
    text: "Disagree",
    value: 2,
  },
  {
    id: 3,
    text: "I am Neutral",
    value: 3,
  },
  {
    id: 4,
    text: "Agree",
    value: 4,
  },
  {
    id: 5,
    text: "Strongly Agree",
    value: 5,
  },
  {
    id: 6,
    text: "Not Applicable",
    value: -1,
  },
];

export default function AnswerOptions({ question_id }) {
  const navigate = useNavigate();
  const interview_id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("interview_id="))
    ?.split("=")[1];
  const saveAnswer = async (question_id, answer_value) => {
    const int_value = parseInt(answer_value);
    const response = await axios.post("/api/question", {
      interview_id: interview_id,
      question_id: question_id,
      client_answer: int_value,
    });
    return response;
  };
  const submitAnswer = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    try {
      await saveAnswer(question_id, value);
    } catch (err) {
      alert(err) && navigate("/");
    } finally {
      const next_question = question_id + 1;
      if (next_question === 47) {
        const response = await axios.post("/api/end", {
          interview_id: interview_id,
        });
        response.status === 200 && navigate("/end");
      } else {
        navigate("/question/" + next_question);
      }
    }
  };
  return (
    <section className="d-grid gap-2" id="multiple_choice_answer">
      {answer_options.map(({ id, text, value }) => (
        <button
          type="button"
          className="btn btn-outline-primary"
          key={id}
          value={value}
          id={`multiple_choice_select_${id}`}
          onClick={submitAnswer}
        >
          {text}
        </button>
      ))}
    </section>
  );
}
