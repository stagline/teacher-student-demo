import React from 'react'
import { useHistory } from "react-router-dom"

function Teacher() {

    const history = useHistory()

    const showStudentsData = () => {
        history.push("/students-data")
        window.location.reload(true);
    }

    const createExam = () => {
        history.push("/create-exam")
    }

    const showVerifiedStudents = () => {
        history.push("/verified-student")
    }

    const showViewExam = () => {
        history.push("/view-exam")
    }

    const viewExamDetail = () => {
        history.push("/view-exam-detail")
    }

    const viewStudentsDetail = () => {
        history.push("/view-students-detail")
    }

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <div className="row mx-md-n5">
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={showStudentsData} >Show All Students Data</div></div>
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={createExam} >Create Exam</div></div>
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={showVerifiedStudents} >Verified Students</div></div>
            </div>
            <div style={{ marginTop: "35px" }} className="row mx-md-n5">
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={showViewExam} >View Exam</div></div>
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={viewExamDetail}>View Exam Detail</div></div>
                <div className="col px-md-5"><div className="p-3 border bg-light" onClick={viewStudentsDetail} >View Students Detail</div></div>
            </div>
        </div>
    )
}

export default Teacher
