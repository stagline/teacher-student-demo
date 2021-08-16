import React from 'react'
import useVerified from './useVerified'
import  ReactPaginate  from "react-paginate"

function VerifiedStudent() {

    const [{ data, pageCount, handlePageClick }] = useVerified()

    return (
        <div>
            <h1>Verified Students</h1>
            {data}
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
            activeClassName={"active"} />
        </div>
    )
}

export default VerifiedStudent
