import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function BeginSurvey() {
  const [pid, setPID] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "pid":
        setPID(parseInt(value));
        break;
      case "first_name":
        setFirstName(value.trim().toLowerCase());
        break;
      case "last_name":
        setLastName(value.trim().toLowerCase());
        break;
      default:
        return;
    }
  };
  const createRecord = async (client_info) =>
    await axios.post("/api/begin", client_info).then((res) => res);

  const begin = async (e) => {
    e.preventDefault();
    if (pid === null || first_name === null || last_name === null) {
      alert(
        "Ensure all fields have been filled out and your information is accurate in order to proceed"
      );
      return;
    }
    const client_info = {
      PID: pid,
      first_name: first_name,
      last_name: last_name,
    };
    try {
      const interview_res = await createRecord(client_info);
      const expiration = new Date().getHours() + 2;
      const expiration_date = new Date(new Date().setHours(expiration));
      document.cookie = `interview_id=${interview_res}; expires=${expiration_date}; Secure;`;
      interview_res.status === 201 && navigate("/question/1");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <main className="container">
      <h1 className="mb-5">Client Information</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="pid" className="form-label">
            PID
          </label>
          <input
            type="number"
            className="form-control"
            id="pid"
            name="pid"
            min={0}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={handleChange}
          />
        </div>
        <button
          id="begin_interview"
          type="button"
          className="btn btn-outline-success"
          onClick={begin}
        >
          Begin Survey
        </button>
      </form>
    </main>
  );
}
