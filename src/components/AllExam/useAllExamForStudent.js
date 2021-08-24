import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../Contexts/DataContext';

function useAllExamForStudent() {

    const { config, token } = useContext(DataContext)

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(5);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        getData()
    }, [offset])

    const getData = async () => {
        const response = await axios.get(`https://nodejsexamination.herokuapp.com/student/studentExam?token=${token}`, config)
        const data = response?.data?.data
        console.log(data, "from data");
        const slice = data?.slice(offset, offset + perPage)
        const postData = slice?.map(pd => (<div className="card mt-4" key={pd._id}>
            <div className="card-header">
                Id :  {pd._id}
            </div>
            <div className="card-body">
                <p className="card-text">Email : {pd.email}</p>
                <a className="btn btn-primary ">Subject Name : {pd.subjectName}</a>
            </div>
        </div>))
        setData(postData)
        setPageCount(Math.ceil(data?.length / perPage))
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };


    return [{ data, pageCount, handlePageClick }]
}

export default useAllExamForStudent
