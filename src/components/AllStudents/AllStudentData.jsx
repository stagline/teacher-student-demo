import React from 'react'
import ReactPaginate from 'react-paginate';
import useAllStudentsData from './useAllStudentsData';

function AllStudentData() {

    const [{ teacherData, pageCount, handlePageClick }] = useAllStudentsData()

    return (
        <div>
            <h1>All Students Data</h1>
            {teacherData}
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

export default AllStudentData
