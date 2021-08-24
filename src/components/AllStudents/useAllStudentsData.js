import { useContext } from 'react'
import DataContext from '../../Contexts/DataContext'

function useAllStudentsData() {

    const { teacherData, pageCount, handlePageClick } = useContext(DataContext)

    return [{ teacherData, pageCount, handlePageClick }]
}

export default useAllStudentsData

