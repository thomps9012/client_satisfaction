import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OpenAnswerOption({ question_id }) {
  const navigate = useNavigate();
  const interview_id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("interview_id="))
    ?.split("=")[1];
  const saveAnswer = async (question_id, answer_value) => {
    const response = await axios.post("/api/question", {
      interview_id: interview_id,
      question_id: question_id,
      client_answer: answer_value,
    });
    return response;
  };
  const submitAnswer = async (e) => {
    e.preventDefault();
    const answer_value = document.getElementById("open-answer").value.trim();
    if (answer_value.length === 0 || answer_value === "") {
      alert("Answer is required to proceed");
      return;
    }
    try {
      await saveAnswer(question_id, answer_value);
    } catch (err) {
      alert(err) && navigate("/");
    } finally {
      const next_question = question_id + 1;
      if (next_question === 47) {
        const response = await axios.post("/api/end", {
          interview_id: interview_id,
        });
        if (response.status === 200) {
          document.cookie =
            "interview_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;";
          navigate("/end");
        }
      } else {
        navigate("/question/" + next_question);
      }
    }
  };
  return (
    <section className="d-flex flex-column">
      <div className="form-floating mb-2">
        <textarea
          className="form-control"
          id="open-answer"
          style="height: 150px"
        ></textarea>
        <label for="open-answer">Answer Below</label>
      </div>
      <button
        type="button"
        id="open-answer-submit"
        className="btn btn-outline-primary"
        onClick={submitAnswer}
      >
        Save Answer
      </button>
    </section>
  );
}
