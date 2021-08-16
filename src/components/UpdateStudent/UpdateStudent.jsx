import React, { useContext, useEffect } from 'react'
import useUpdate from './useUpdate'

function UpdateStudent() {

    const [{ data, handleChange, updateProfile }] = useUpdate()

    return (
        <div>
            <h1>Update Profile</h1>
            {
                !data ? "Loading..." : (<div>

                    <form action="">
                        <label htmlFor="">Id:</label>
                        <input type="text" value={data?._id} name="id" onChange={handleChange} disabled />
                        <br /><br />
                        <label htmlFor="">Name:</label>
                        <input type="text" name="name" onChange={handleChange} />
                        <br /><br />
                        <label htmlFor="">Email:</label>
                        <input type="text" value={data?.email} name="email" onChange={handleChange} disabled />
                        <br /><br />
                        <label htmlFor="">Role:</label>
                        <input type="text" value={data?.role} name="role" onChange={handleChange} disabled />
                        <br /><br />
                    </form>
                    <button className="btn btn-primary" onClick={updateProfile} >update profile</button>
                </div>)
            }

        </div>
    )
}

export default UpdateStudent
