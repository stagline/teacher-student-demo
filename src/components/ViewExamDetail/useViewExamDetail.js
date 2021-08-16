import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useViewExamDetail() {

    const { config } = useContext(DataContext)

    const [viewExamDetail, setViewExamDetail] = useState()

    useEffect(() => {
        axios.get("https://nodejsexamination.herokuapp.com/dashboard/Teachers/examDetail?id=610bb6e2152cea0015af0f14", config)
            .then(response => {
                console.log("ViewExamDetail>>>",response)
                setViewExamDetail({ viewExamDetail })
            })
    },[])

    return [{ viewExamDetail }]
}

export default useViewExamDetail
