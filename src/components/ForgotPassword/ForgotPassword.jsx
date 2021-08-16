import React from 'react'
import useForgotPassword from './useForgotPassword'

function Login() {

    const [{ handleChange, handleSubmit }] = useForgotPassword()

    return (
        <div>
            <h1>Login Form</h1>
            <form onChange={handleChange} onSubmit={handleSubmit} >
                <label htmlFor="">email : </label>
                <input name="email" type="email" placeholder="email" required />
                <br />
                <br />
                <input type="submit" value="Reset Password" />
                <a className="navbar-brand" href="/login">Back to Login</a>
            </form>
        </div>
    )
}

export default Login
