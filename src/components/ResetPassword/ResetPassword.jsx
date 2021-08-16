import React from 'react'
import useResetPassword from './useResetPassword'

function SignUp() {

    const [{ handleChange, handleSubmit }] = useResetPassword()

    return (
        <div>
            <h1>Reset Password</h1>
            <form onChange={handleChange} onSubmit={handleSubmit} >
                <label htmlFor="">old password : </label>
                <input type="text" name="oldPassword" placeholder="oldPassword" required />
                <br /><br />
                <label htmlFor="">password : </label>
                <input name="Password" placeholder="password" required />
                <br />
                <br />
                <label htmlFor="">cnf password : </label>
                <input name="ConfirmPassword" placeholder="confirmpassword" required />
                <br /><br />
                <input type="submit" value="Reset Password" />
                <label htmlFor="">
                    <a className="navbar-brand" href="/login">Already account?</a>
                </label>
            </form>
        </div>
    )
}

export default SignUp
