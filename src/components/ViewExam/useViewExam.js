import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useViewExam() {


    const { config } = useContext(DataContext)

    const [viewExam, setViewExam] = useState()
    const [name, setName] = useState({})
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        axios.get("https://nodejsexamination.herokuapp.com/dashboard/Teachers/viewExam", config)
            .then(response => {
                console.log("ViewExam>>>", response)
                setViewExam({ response })
            })
    }, [])

    const viewExamData = viewExam?.response?.data?.data
    // console.log(viewExamData.map(u => u._id).filter((list) => list._id  === _id))

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("https://nodejsexamination.herokuapp.com/dashboard/Teachers/editExam?id=610bb668152cea0015af0f04", { subjectName: name.subjectName }, config)
            .then(response => {
                console.log("EditExam>>>", response)
            })
        console.log("Success Edit")
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault(e);
        axios.delete("https://nodejsexamination.herokuapp.com/dashboard/Teachers/deleteExam?id=610bb6e2152cea0015af0f14", config)
            .then(response => {
                console.log("DelteExam>>>", response)
            })
        console.log("Success Delete")
    }

    const handleChange = e => {
        setName({ ...name, [e.target.name]: e.target.value })
        console.log("handle")
    }




    return [{ viewExamData, toggleModal, isOpen, handleChange, handleSubmit, handleDeleteSubmit }]
}

export default useViewExam
