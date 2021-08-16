import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useUpdate() {

    const { config } = useContext(DataContext)

    const [name, setName] = useState({
        _id: "",
        name: "",
        email: "",
        role: ""
    })
    useEffect(() => {
        axios.get(`https://nodejsexamination.herokuapp.com/student/getStudentDetail`, config)
            .then(response => {
                setName({ response })
                console.log(response);
            })
    }, [])
    const data = name?.response?.data?.data

    const updateProfile = async () => {
        const response = await axios.put('https://nodejsexamination.herokuapp.com/student/studentProfile', { name: name.name }, config);
        console.log(response);
        alert("Profile Updated Sucessfully")
    }

    const handleChange = (e) => {
        setName({ ...name, [e.target.name]: e.target.value })
    }

    return [{ data, handleChange, updateProfile }]
}

export default useUpdate
