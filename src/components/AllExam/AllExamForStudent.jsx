import React from 'react'
import ReactPaginate from 'react-paginate'
import useAllExamForStudent from './useAllExamForStudent'

function AllExamForStudent() {

    const [{ data, pageCount, handlePageClick }] = useAllExamForStudent()

    return (
        <div>
            <h1>Student Exam</h1>
            <div className="App">
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
        </div>
    )
}

export default AllExamForStudent
