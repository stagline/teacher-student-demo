import React from "react";
import useVerified from "./useVerified";
import ReactPaginate from "react-paginate";

function VerifiedStudent() {
  const [{ data, pageCount, handlePageClick, setVerifiedData }] = useVerified();
  console.log(setVerifiedData);

  return (
    <div>
      <h1>Verified Students</h1>
      {!setVerifiedData ? (
        "Loading..."
      ) : (
        <>
          {setVerifiedData?.map((u, i) => (
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
                    <td>{u._id}</td>
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
      {/* {data}
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
        activeClassName={"active"}
      /> */}
    </div>
  );
}

export default VerifiedStudent;
