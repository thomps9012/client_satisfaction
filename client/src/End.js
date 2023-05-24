import { useEffect } from "react";

export default function EndSurvey() {
  useEffect(() => {
    document.cookie = "interview_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None;"
  }, [])
  return (
    <main className="container">
      <h3>
        Thank you for completing the Satisfaction Survey <hr /> You may close
        this tab / browser
      </h3>
    </main>
  );
}
