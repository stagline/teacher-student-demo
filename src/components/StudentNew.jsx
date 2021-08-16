import React from 'react'
import { useParams } from 'react-router-dom'

function StudentNew({data}) {
    const { name } = useParams()
    console.log(name);
    return (
        <div>
            <h1>Student New</h1>
            <div className="full-detail">
                <div className="explore-container">
                    {
                        
                            data?.filter((list) => list.name === name)
                            .map((list) => (
                                <div className="full-card" key={list.id}>
                                    <h2>Name: {list.name}</h2>
                                    <h4>Category: {list.category}</h4>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    )
}

export default StudentNew
