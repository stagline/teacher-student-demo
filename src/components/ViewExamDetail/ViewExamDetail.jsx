import React from 'react'
import useViewExamDetail from './useViewExamDetail'

function ViewExamDetail() {

    const [{ viewExamDetail }] = useViewExamDetail()

    return (
        <div>
            <h1>View Exam Detail</h1>
        </div>
    )
}

export default ViewExamDetail
