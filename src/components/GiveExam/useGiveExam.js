import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function useGiveExam() {
  const { config } = useContext(DataContext);

  const { _id } = useParams();
  const history = useHistory();

  const [data, setData] = useState();
  const [giveExam, setGiveExam] = useState([
    {
      question: _id,
      answer: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(
        `https://nodejsexamination.herokuapp.com/student/examPaper?id=${_id}`,
        config
      )
      .then((response) => {
        if (response.data.statusCode === 500) {
          alert(response.data.message);
          history.push("/student");
          return;
        } else {
          console.log("Response from Give Exam>>>", response);
          setData({ response });
        }
      });
  }, []);

  const submit = () => {
    axios
      .post(
        `https://nodejsexamination.herokuapp.com/student/giveExam?id=${_id}`,
        giveExam,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Submit Success!");
  };

  return [{ submit, data }];
}

export default useGiveExam;
