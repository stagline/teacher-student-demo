import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useGetStudentDetail() {

    const { config, token } = useContext(DataContext)
    const [profile, setProfile] = useState()

    useEffect(() => {
        axios.get(`https://nodejsexamination.herokuapp.com/student/getStudentDetail?token=${token}`, config)
            .then(response => {
                setProfile({ response })
                console.log(response);
            })
    }, [])

    return [{ profile }]
}

export default useGetStudentDetail
