import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function useResetPassword() {

    const history = useHistory()

    const [user, setUser] = useState({
        oldPassword: "",
        Password: "",
        ConfirmPassword: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        console.log(token);
        let config = {
            headers: {
                "access-token": token
            }
        }
        axios.post("https://nodejsexamination.herokuapp.com/users/ResetPassword", user, config)
            .then(data => {
                console.log(data);
                let token = data?.data?.data?.token
                localStorage.setItem("token", token);
            })
            .catch(error => console.log("Error occurs", error))
        history.push("/login")
    }

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return [{ handleChange, handleSubmit }]
}

export default useResetPassword
