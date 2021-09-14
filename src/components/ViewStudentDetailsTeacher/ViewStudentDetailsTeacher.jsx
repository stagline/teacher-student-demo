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
              <p>
                <b>ID :</b> {u._id}
              </p>
              <p>
                <b>Name :</b>
                {u.name}
              </p>
              <p>
                <b>Email :</b>
                {u.email}
              </p>
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
                      <b>ResultStatus :</b>
                      {JSON.stringify(currElement.resultStatus)}
                    </p>
                    <br />
                    <br />
                    <br />
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
