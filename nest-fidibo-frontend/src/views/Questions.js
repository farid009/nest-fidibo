import { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../context/Axios";

const Container = styled.div``;
const Questions = (props) => {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    Axios.get("/v1/students/1/questions")
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Container>
      <h1>​$/v1​/students​/id/questions</h1>
      <div className="data-list">
        {questions.map((question) => (
          <ul>
            <p>question: {question.stem}</p>
            <p>explanation: {question.explanation}</p>
            <p>options:</p>
            <li>{question.option1}</li>
            <li>{question.option2}</li>
            <li>{question.option3}</li>
            <li>{question.option4}</li>
          </ul>
        ))}
      </div>
    </Container>
  );
};
export default Questions;
