import "./App.css";
import Routes from "./routes/index";
import DataContext from "./Contexts/DataContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "access-token": token,
    },
  };

  // Student Dashboard
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://nodejsexamination.herokuapp.com/student/studentExam",
        config
      )
      .then((response) => {
        setData({ response });
      });
  }, []);

  const studentData = data?.response?.data?.data;
  // console.log(studentData, "<<<<<<<from app");

  // Teacher Dashboard

  const [offset, setOffset] = useState(0);
  const [teacherData, setTeacherData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://nodejsexamination.herokuapp.com/dashboard/Teachers",
      config
    );
    const data = response?.data?.data;
    const slice = data?.slice(offset, offset + perPage);
    const postData = slice?.map((u) => (
      <div key={u._id}>
        <table className="table table-success table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={`/view-student-details/${u._id}`}>{u._id}</Link>{" "}
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ));
    setTeacherData(postData);
    setPageCount(Math.ceil(data?.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    console.log("Click");
  };

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          token,
          config,
          studentData,
          teacherData,
          pageCount,
          handlePageClick,
        }}
      >
        <Routes />
      </DataContext.Provider>
    </div>
  );
}

export default App;
