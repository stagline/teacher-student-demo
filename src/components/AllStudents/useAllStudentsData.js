import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";

function useAllStudentsData() {
  const { teacherData, pageCount, handlePageClick, config } =
    useContext(DataContext);

  const [allStudent, setAllStudent] = useState();

  useEffect(() => {
    axios
      .get("https://nodejsexamination.herokuapp.com/dashboard/Teachers", config)
      .then((response) => {
        setAllStudent(response);
      });
  }, []);

  const allStudentData = allStudent?.data?.data;
  console.log(allStudentData);

  return [{ teacherData, pageCount, handlePageClick, allStudentData }];
}

export default useAllStudentsData;
