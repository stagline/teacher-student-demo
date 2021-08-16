import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"

function useForgotPassword() {

    const history = useHistory()

    const [user, setUser] = useState({
        email: ""
    })

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("https://nodejsexamination.herokuapp.com/users/ForgotPassword", user)
            .then(data => {
                console.log(data.data)
            })
        history.push("/reset-password")
        console.log("Successfully Submitted")
    }

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    return [{ handleChange, handleSubmit }]
}

export default useForgotPassword
