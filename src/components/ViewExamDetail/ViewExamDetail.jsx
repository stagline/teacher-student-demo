import React from "react";
import useViewExamDetail from "./useViewExamDetail";

function ViewExamDetail() {
  const [{ viewExamData }] = useViewExamDetail();
  console.log("viewExamData", viewExamData);

  return (
    <div>
      <h1>View Exam Detail</h1>
      {viewExamData?.map((u, i) => (
        <table className="table table-success table-striped" key={i}>
          <thead>
            <tr>
              <th scope="col">Question:</th>
              <th scope="col">Answer</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {u.question}</td>
              <td>{u.answer}</td>
              <td>{u.options}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default ViewExamDetail;
