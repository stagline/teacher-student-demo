import React from 'react'
import { Link } from 'react-router-dom'

function Explore({ data }) {
    console.log(data);
    return (
        <div>
            <h1>Explore</h1>
            {data.map(list => (
                <div key={list.id}>
                    <h4>Name: <Link to={`/explore/${list.name}`}>{list.name}</Link></h4>
                </div>
            ))}
        </div>
    )
}

export default Explore
