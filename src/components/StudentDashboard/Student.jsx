import React from "react";
import { Link } from "react-router-dom";
import useStudent from "./useStudent";

function Student() {
  const [{ studentData, getStudentDetail, updateStudent }] =
    useStudent();

  return (
    <div>
      <h1>Student Dashboard</h1>
      <div class="row mx-md-n5">
        <div class="col px-md-5">
          <div class="p-3 border bg-light" onClick={getStudentDetail}>
            Get Student Details
          </div>
        </div>
        <div class="col px-md-5">
          <div class="p-3 border bg-light" onClick={updateStudent}>
            Update Student Details
          </div>
        </div>
      </div>
      <br />
      <h1>All Exams For Students</h1>
      {!studentData
        ? "Loading..."
        : studentData?.map((list) => (
            <div className="card mt-4" key={list._id}>
              <div className="card-header">
                <h4>
                  ID: <Link to={`/student/${list._id}`}>{list._id}</Link>
                </h4>
              </div>
              <div className="card-body">
                <p className="card-text">Email : {list.email}</p>
                <a className="btn btn-primary ">
                  Subject Name : {list.subjectName}
                </a>
              </div>
              <h4>
                <button>
                  <Link to={`/give-exam/${list._id}`}> Give Exam: </Link>
                </button>
              </h4>
            </div>
          ))}
    </div>
  );
}

export default Student;
