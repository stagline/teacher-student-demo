import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";
import { useHistory } from "react-router-dom";

function useStudent() {
  const { token, studentData } = useContext(DataContext);
  console.log(studentData, "<<<<<<<<<from student");

  const history = useHistory();

  const getStudentDetail = () => {
    history.push(`/student-detail?token=${token}`);
  };

  const updateStudent = () => {
    history.push(`/student-update?token=${token}`);
  };

  return [{ studentData, getStudentDetail, updateStudent }];
}

export default useStudent;
