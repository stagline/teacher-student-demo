import React from 'react'
import useSignUp from './useSignUp'

function SignUp() {

    const [{ handleChange, handleSubmit }] = useSignUp()

    return (
        <div>
            <h1>Registration Form</h1>
            <form onChange={handleChange} onSubmit={handleSubmit} >
                <label htmlFor="">name : </label>
                <input type="text" name="name" placeholder="name" required  />
                <br /><br />
                <label htmlFor="">email : </label>
                <input name="email" type="email" placeholder="email" required />
                <br />
                <br />
                <label htmlFor="">password : </label>
                <input name="password" placeholder="password" required />
                <br />
                <br />
                <label htmlFor="">
                    <input type="radio" value="teacher" name="role" required />
                    Teacher
                </label>
                <label htmlFor="">
                    <input type="radio" value="student" name="role" required />
                    Student
                </label>
                <br /><br />
                <input type="submit" value="Register" />
                <label htmlFor="">
                    <a className="navbar-brand" href="/login">Already account?</a>
                </label>
            </form>
        </div>
    )
}

export default SignUp
