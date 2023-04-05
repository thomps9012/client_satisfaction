export default function ProgressBar({ progress }) {
    return <section className="mb-5">
        <div className="progress" role="progressbar" aria-label="Satisfaction Survey Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
    </section>
}