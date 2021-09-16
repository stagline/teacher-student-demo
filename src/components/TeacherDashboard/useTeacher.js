import { useHistory } from "react-router-dom";

function useTeacher() {
  const history = useHistory();

  const showStudentsData = () => {
    history.push("/students-data");
    // window.location.reload(false);
  };

  const createExam = () => {
    history.push("/create-exam");
  };

  const showVerifiedStudents = () => {
    history.push("/verified-student");
  };

  const showViewExam = () => {
    history.push("/view-exam/:_id");
  };
  return [{ showStudentsData, createExam, showVerifiedStudents, showViewExam }];
}

export default useTeacher;
