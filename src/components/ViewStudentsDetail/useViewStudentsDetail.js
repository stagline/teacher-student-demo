import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useViewStudentsDetail() {

    const { config } = useContext(DataContext)

    const [viewStudentDetail, setViewExamDetail] = useState()

    useEffect(() => {
        axios.get("https://nodejsexamination.herokuapp.com/dashboard/Teachers/viewStudentDetail?=610bb6e2152cea0015af0f14", config)
            .then(response => {
                console.log("ViewStudentDetail>>>",response)
                setViewExamDetail({ response })
            })
    }, [])

    return [{ viewStudentDetail }]
}

export default useViewStudentsDetail
