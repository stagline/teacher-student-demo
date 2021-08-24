import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function useLogin() {

    let history = useHistory()

    const [user, setUser] = useState({})
    const [role, setRole] = useState()

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("https://nodejsexamination.herokuapp.com/users/Login", user)
            .then(data => {
                console.log("Login>>>",data?.data)
                let token = data?.data?.data?.token
                const role = data?.data?.data?.role
                setRole({ role })
                console.log("Role>>>",role);
                localStorage.setItem("token", token);
                if (role === "teacher") {
                    history.push("/teacher")
                }
                else {
                    history.push("/student")
                    window.location.reload(false);
                }
            })

        console.log("Successfully Logged In")
    }

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return [{ handleChange, handleSubmit }]
}

export default useLogin
