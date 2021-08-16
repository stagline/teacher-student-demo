import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from "../../Contexts/DataContext"
import { useParams } from 'react-router-dom'

function ExamPaper({ as }) {
    console.log(as, "<<<<<<from exam paper");
    const { _id } = useParams()
    console.log(_id);

    const { config } = useContext(DataContext)

    const [data, setData] = useState()

    const a = as?.filter((list) => _id === _id).map(u => u._id)

    useEffect(() => {
        axios.get(`https://nodejsexamination.herokuapp.com/student/examPaper?id=${_id}`, config)
            .then(response => {
                console.log(response);
                setData({ response })
            })
    }, [])
    console.log(a, "aaa");

    const result = data?.response?.data?.data
    console.log(result, "<<<<<<<mai");

    return (
        <div>
            <h1>Students Exam Paper</h1>
            {
                !result ? "Loading..." : (
                    <div>
                        {
                            result?.map(u => (
                                <div className="card mt-4" key={u._id}>
                                    <div className="card-header">
                                        <h2 style={{ display: "inline-flex" }} >Questions : <p>{u.question}</p></h2>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list">
                                            <h3>Options :</h3>
                                            <li><h4>{u.options[0]}</h4></li>
                                            <li><h4>{u.options[1]}</h4></li>
                                            <li><h4>{u.options[2]}</h4></li>
                                            <li><h4>{u.options[3]}</h4></li>
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ExamPaper
