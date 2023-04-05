export default function Question({ current_question }) {
    const { question } = current_question
    return <section className="mb-5">
        <h1>{question}</h1>
    </section>
}