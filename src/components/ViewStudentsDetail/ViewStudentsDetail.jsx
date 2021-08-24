import React from 'react'
import useViewStudentsDetail from './useViewStudentsDetail'

function ViewStudentsDetail() {

    const [{ viewStudentsDetail }] = useViewStudentsDetail()

    return (
        <div>
            <h1>View Students Detail</h1>
        </div>
    )
}

export default ViewStudentsDetail
