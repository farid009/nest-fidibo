import { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../context/Axios";

const Container = styled.div``;
const Reports = (props) => {
  const [reports, setReports] = useState({});

  useEffect(() => {
    Axios.get("/v1/admin/customer-and-student-number-report")
      .then((res) => {
        setReports(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    Axios.get("/v1/customers/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [formData, setFormData] = useState({
    studentId: 0,
    courseId: 0,
  });

  const handleSelectChange = (e) => {
    let studentId = parseInt(e.target.value);
    setFormData({ studentId: studentId, courseId: 1 });
  };

  const handleInputChange = (e) => {
    let courseId =
      e.target.value !== "" ? parseInt(e.target.value) : e.target.value;
    setFormData((state) => ({
      studentId: parseInt(state.studentId),
      courseId: courseId,
    }));
  };

  const [controllerResponse, setControllerResponse] = useState({
    courseQuestionAnswersCount: {
      count: 0,
    },
    courseQuestionAnswersCorrectPercentage: null,
  });

  useEffect(() => {
    console.log(formData);
    if (formData.courseId && formData.studentId) {
      Axios.get(
        `/v1/admin/answer-report/student/${formData.studentId}​/course/${formData.courseId}`
      ).then((res) => {
        setControllerResponse(res.data);
      });
    }
  }, [formData]);

  return (
    <Container>
      <h1>Total reports</h1>
      <p>customersCount: {reports.customersCount}</p>
      <p>studentsCount: {reports.studentsCount}</p>

      <form className="get-by-id-form" onSubmit={(e) => e.preventDefault()}>
        <h1>select from students and courses</h1>
        <div className="input-holder">
          <label>select student</label>
          <div style={{ height: 10 }} />

          <select onChange={handleSelectChange}>
            {students.map((costumer) =>
              costumer.students.map((student) => (
                <option value={student.id}>{student.name}</option>
              ))
            )}
          </select>
        </div>
        <div style={{ height: 30 }} />
        <div className="input-holder">
          <label>enter course id</label>
          <div style={{ height: 10 }} />
          <input value={formData.courseId} onChange={handleInputChange} />
        </div>
        <div style={{ height: 20 }} />
      </form>
      {controllerResponse && (
        <>
          <div>
            <p>count: {controllerResponse.courseQuestionAnswersCount?.count}</p>
          </div>
          <div>
            <p>
              courseQuestionAnswersCorrectPercentage:{" "}
              {controllerResponse.courseQuestionAnswersCorrectPercentage
                ? controllerResponse.courseQuestionAnswersCorrectPercentage
                : "null"}
            </p>
          </div>
        </>
      )}
    </Container>
  );
};
export default Reports;
