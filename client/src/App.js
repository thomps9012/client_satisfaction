import { Routes, useNavigate, Route } from "react-router-dom";
import QuestionPage from "./QuestionPage";
import BeginSurvey from "./Begin";
import EndSurvey from "./End";

function Layout({ children }) {
  return <main>
    {children}
    <footer className="text-center">
      © {new Date().getFullYear()} <a href="https://ts_z1.gitlab.io">ts_z</a>
    </footer>
  </main>
}

function Home() {
  const navigate = useNavigate()
  const beginSurvery = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/begin")
  }
  return <main className='container'>
    <h1 className="mb-5 text-center">NORA Client Satisfaction Survey</h1>
    <button type="link" className="btn btn-link" onClick={beginSurvery}><h3>Begin Survey</h3></button>
  </main>
}

function NotFound() {
  const navigate = useNavigate()
  const navigateHome = (e) => {
    e.preventDefault();
    navigate("/")
  }
  return <main className="container">
    <h1>404 Page Not Found</h1>
    <button type="btn" className="btn btn-link" onClick={navigateHome}><h3>Return to Safety</h3></button>
  </main>
}


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/begin" element={<BeginSurvey />} />
        <Route path="/question/:current_question_id" element={<QuestionPage />} />
        <Route path="/end" element={<EndSurvey />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
