import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useAllStudentsData from "./useAllStudentsData";

function AllStudentData() {
  const [{ teacherData, pageCount, handlePageClick, allStudentData }] =
    useAllStudentsData();

  return (
    <div>
      <h1>All Students Data</h1>

      {!allStudentData ? (
        "Loading..."
      ) : (
        <>
          {allStudentData?.map((u, i) => (
            <div key={i}>
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
          ))}
        </>
      )}

      {/* {teacherData}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} /> */}
    </div>
  );
}

export default AllStudentData;
