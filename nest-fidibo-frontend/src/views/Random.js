import { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../context/Axios";

const Container = styled.div`
  width: 70vw;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Random = () => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value != "" ? parseInt(e.target.value) : "",
    });
  };
  const [formData, setFormData] = useState({
    student: 0,
    question: 0,
  });
  const handleSubmit = (key) => {
    if (key === "student") {
      if (formData.student) {
        Axios.post(
          `/v1/admin/students/random-number/{randomNumber}?randomNumber=${formData.student}`
        ).then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("successful");
          } else {
            alert("failure action. please try again");
          }
        });
      }
    } else if (key === "question") {
      if (formData.question) {
        Axios.post(
          `/v1/admin/question-answers/random-number/{randomNumber}?randomNumber=${formData.question}`
        ).then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("successful");
          } else {
            alert("failure action. please try again");
          }
        });
      }
    }
  };

  return (
    <Container>
      <div className="rand-f-holder">
        <div className="input-holder">
          <h5>generate random question-answer</h5>
          <input
            name="question"
            value={formData.question}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ height: 20 }} />

        <button onClick={() => handleSubmit("question")}>submit</button>
      </div>
      <div className="rand-f-holder">
        <div className="input-holder">
          <h5>generate random students</h5>
          <input
            name="student"
            value={formData.student}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ height: 20 }} />

        <button onClick={() => handleSubmit("student")}>submit</button>
      </div>
    </Container>
  );
};
export default Random;
