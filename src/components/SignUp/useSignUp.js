import axios from 'axios'
import { useState } from 'react'

function useSignUp() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://nodejsexamination.herokuapp.com/users/SignUp", user)
            .then(data => {
                console.log(data);
                alert("User Registration Successfully")
                let token = data?.data?.data?.token
                localStorage.setItem("token", token);
            })
            .catch(error => console.log("Error occurs", error))
    }

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return [{ handleChange, handleSubmit }]
}

export default useSignUp
