import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext'

function useVerified() {

    const { config } = useContext(DataContext)

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const response = await axios.get("https://nodejsexamination.herokuapp.com/dashboard/Teachers/StudentForExam", config)
        console.log("VerifiedStudents>>>",response)
        const data = response?.data?.data
        const slice = data?.slice(offset, offset + perPage)
        const postData = slice?.map(u => (<div key={u._id}>
            <table className="table table-success table-striped" key={u._id}>
                <thead>
                    <tr>
                        <th scope="col" >Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td > {u._id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        ))
        setData(postData)
        setPageCount(Math.ceil(data?.length / perPage))
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return [{ data, pageCount, handlePageClick }]
}

export default useVerified


