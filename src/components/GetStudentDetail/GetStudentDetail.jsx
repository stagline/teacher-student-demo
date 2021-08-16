import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'
import useGetStudentDetail from './useGetStudentDetail'

function GetStudentDetail() {

    const [{ profile }] = useGetStudentDetail()

    return (
        <div>
            <h1>Student Details</h1>
            {
                !profile ? "Loading..." :

                    !profile?.response?.data ? "" : (
                        <div>
                            <div className="card mt-4">
                                <div className="card-header">
                                    Id :  {profile?.response?.data?.data?._id}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Name :{profile?.response?.data?.data?.name}</h5>
                                    <p className="card-text">Email : {profile?.response?.data?.data?.email}</p>
                                    <p className="card-text">Role :{profile?.response?.data?.data?.role}</p>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default GetStudentDetail
