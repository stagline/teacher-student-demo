import React from "react";
import useViewStudentDetailsTeacher from "./useViewStudentDetailsTeacher";

function ViewStudentDetailsTeacher() {
  const [{ viewStudentData }] = useViewStudentDetailsTeacher();
  console.log(viewStudentData);

  return (
    <div>
      <h1>Student Details</h1>

      {!viewStudentData ? (
        "Loading..."
      ) : (
        <>
          {viewStudentData?.map((u, i) => (
            <div key={i}>
              <div className="card mt-4">
                <div className="card-header">
                  <b>Id :</b> {u._id}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Name :</b> {u.name}
                  </h5>
                  <p className="card-text">
                    <b>Email :</b> {u.email}
                  </p>
                </div>
              </div>
              <br />
              {u?.Result?.map((currElement, index) => {
                return (
                  <div key={index}>
                    <h1>Result {index + 1}</h1>
                    <p>
                      <b>ID :</b> {JSON.stringify(currElement._id)}
                    </p>
                    <p>
                      <b>SubjectName :</b>
                      {JSON.stringify(currElement.subjectName)}
                    </p>
                    <p>
                      <b>Score :</b>
                      {JSON.stringify(currElement.score)}
                    </p>
                    <p>
                      <b>Rank :</b>
                      {JSON.stringify(currElement.rank)}
                    </p>
                    <p>
                      <b>ResultStatus :</b>
                      {JSON.stringify(currElement.resultStatus)}
                    </p>
                    <br />
                    <h1>Student Answer</h1>
                    {currElement.studentAnswer?.map((o, i) => (
                      <div key={i}>
                        <div>
                          <b>Question {i + 1}: </b> {o.question}
                        </div>
                        <div>
                          <b>Answer :</b> {o.answer}
                        </div>
                        <br />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ViewStudentDetailsTeacher;
