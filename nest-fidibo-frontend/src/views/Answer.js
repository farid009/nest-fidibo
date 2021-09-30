import { useState } from "react";
import styled from "styled-components";
import Axios from "../context/Axios";

const Container = styled.div``;
const Answer = (props) => {
  const [formData, setFormData] = useState({
    id: 0,
    studentId: 0,
  });
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value !== "" ? parseInt(e.target.value) : e.target.value,
    });
  };
  const [result, setResult] = useState(null);
  const handleSubmit = () => {
    if ((formData.id, formData.studentId, formData.answer)) {
      Axios.post(
        `/v1/questions/${formData.id}/studentId/${formData.studentId}/answer`,
        { answer: parseInt(formData.answer) }
      )
        .then((res) => setResult(res.data))
        .catch((e) =>
          setResult(`there is an error. errorCodeStatus: ${e.response?.status}`)
        );
    }
  };
  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="id"
          placeholder="id"
          value={formData.id}
          onChange={handleFormChange}
        />
        <input
          name="studentId"
          placeholder="studentId"
          value={formData.studentId}
          onChange={handleFormChange}
        />
        <input
          name="answer"
          placeholder="answer"
          value={formData.answer}
          onChange={handleFormChange}
        />
        <button onClick={handleSubmit}>submit</button>
      </form>
      <h3>
        {result?.result != null
          ? `${result.result}`
          : "fill inputs and click submit"}
      </h3>
    </Container>
  );
};
export default Answer;
