import questions from "./questions.json"
import AnswerOptions from "./components/AnswerOptions"
import Question from "./components/Question"
import ProgressBar from "./components/Progress"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function QuestionPage() {
    const [current_question, setCurrentQuestion] = useState(questions[0])
    const [progress_percent, setProgress] = useState(0)
    const { current_question_id } = useParams();
    const question_int = parseInt(current_question_id)
    useEffect(() => {
        const next_question = questions[question_int - 1]
        console.log(question_int)
        const new_percent = Math.floor((question_int / 42).toFixed(2) * 100)
        console.log(new_percent)
        setProgress(new_percent)
        setCurrentQuestion(next_question)
    }, [question_int])

    return <main className="container">
        <ProgressBar progress={progress_percent} />
        <Question current_question={current_question} />
        <AnswerOptions question_id={question_int} />
    </main>
}