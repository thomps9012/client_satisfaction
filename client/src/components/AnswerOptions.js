import { useNavigate } from "react-router-dom"
import axios from 'axios'
const answer_options = [
    {
        id: 1,
        text: "Strongly Disagree",
        value: 1
    },
    {
        id: 2,
        text: "Disagree",
        value: 2
    },
    {
        id: 3,
        text: "I am Neutral",
        value: 3
    },
    {
        id: 4,
        text: "Agree",
        value: 4
    },
    {
        id: 5,
        text: "Strongly Agree",
        value: 5
    },
    {
        id: 6,
        text: "Not Applicable",
        value: -1
    },
]

export default function AnswerOptions({ question_id }) {
    const current_interview_id = localStorage.getItem("interview_id")
    const navigate = useNavigate();
    const saveQuestion = async (question_id, answer_value) => {
        const int_value = parseInt(answer_value)
        const response = await axios.post("/api/question", {
            interview_id: current_interview_id,
            question_id: question_id,
            client_answer: int_value
        })
        return response
    }
    const saveAnswer = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        try {
            await saveQuestion(question_id, value)
        } catch (err) {
            alert(err) && navigate("/")
        } finally {
            const next_question = question_id + 1
            if (next_question === 43) {
                const response = await axios.post("/api/end", {
                    interview_id: current_interview_id
                })
                response.status === 200 && navigate("/end")
            } else {
                navigate("/question/" + next_question)
            }
        }
    }
    return <section className="d-grid gap-2">
        {answer_options.map(({ id, text, value }) => (<button type="button" className="btn btn-outline-primary" key={id} value={value} onClick={saveAnswer}>{text}</button>))}
    </section>
}