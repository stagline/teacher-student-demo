import React from "react";
import useTeacher from "./useTeacher";

function Teacher() {
  const [{ showStudentsData, createExam, showVerifiedStudents, showViewExam }] =
    useTeacher();

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <div className="row mx-md-n5">
        <div className="col px-md-5">
          <div className="p-3 border bg-light" onClick={showStudentsData}>
            Show All Students Data
          </div>
        </div>
        <div className="col px-md-5">
          <div className="p-3 border bg-light" onClick={createExam}>
            Create Exam
          </div>
        </div>
        <div className="col px-md-5">
          <div className="p-3 border bg-light" onClick={showVerifiedStudents}>
            Verified Students
          </div>
        </div>
      </div>
      <div style={{ marginTop: "35px" }} className="row mx-md-n5">
        <div className="col px-md-5">
          <div className="p-3 border bg-light" onClick={showViewExam}>
            View Exam
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
