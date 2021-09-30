import { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../context/Axios";

const Container = styled.div``;
const Students = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Axios.get("/v1/customers/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
      <h1>$/api/v1/customers/students</h1>
      <div className="data-list">
        {students.map((customer) => (
          <ul>
            <ul>customer: {customer.name}</ul>
            <p>students:</p>
            {customer.students.map((student) => (
              <li>{student.name}</li>
            ))}
          </ul>
        ))}
      </div>
    </Container>
  );
};
export default Students;
