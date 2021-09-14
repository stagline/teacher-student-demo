import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../Contexts/DataContext";

function useViewStudentDetailsTeacher() {
  const { config } = useContext(DataContext);

  const { _id } = useParams();

  const [viewStudent, setViewStudent] = useState();

  useEffect(() => {
    axios
      .get(
        `https://nodejsexamination.herokuapp.com/dashboard/Teachers/viewStudentDetail?id=${_id}`,
        config
      )
      .then((response) => {
        setViewStudent(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const viewStudentData = viewStudent?.data?.data;

  return [{ viewStudentData }];
}

export default useViewStudentDetailsTeacher;
