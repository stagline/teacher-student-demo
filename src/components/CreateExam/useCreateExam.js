import axios from 'axios'
import { useContext, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useCreateExam() {

    const { config } = useContext(DataContext)

    const [exam, setExam] = useState({
        subjectName: "",
        questions: [
            {
                question: "",
                options: [],
                answer: ""
            }
        ]
    })

    const bodyData = {
        "subjectName": "createExam.subjectName",
        "questions": [
            {
                "question": "question.question",
                "answer": "answer.answer",
                "options": [
                    "ans1",
                    "ans2",
                    "ans3",
                    "ans4"
                ]
            }
        ],
        "notes": [
            "10mins exam",
            "start time 10am"
        ]
    }

    const handleChange = (e) => {
        setExam({ ...exam, [e.target.name]: e.target.value })
        console.log("HandleChange")
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam", bodyData, config)
            .then(response => {
                setExam({ response })
                alert("Exam Created Successfully!")
                console.log(response)
            })
        console.log(exam)
    }

    return [{ onSubmit, handleChange }]
}

export default useCreateExam
