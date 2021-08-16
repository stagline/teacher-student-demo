import React from 'react'
import useLogin from './useLogin'

function Login() {

    const [{ handleChange, handleSubmit }] = useLogin()

    return (
        <div>
            <h1>Login Form</h1>
            <form onChange={handleChange} onSubmit={handleSubmit} >
                <label htmlFor="">email : </label>
                <input name="email" type="email" placeholder="email" required />
                <br />
                <br />
                <label htmlFor="">password : </label>
                <input name="password" type="password" placeholder="password" required />
                <br />
                <br />
                <input type="submit" value="Login" />
                <a className="navbar-brand" href="/forgot-password">forgot details</a>
            </form>
        </div>
    )
}

export default Login
