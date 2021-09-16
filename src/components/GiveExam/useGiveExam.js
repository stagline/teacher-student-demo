import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function useGiveExam() {
  const { _id } = useParams();
  const [question, setQuestion] = useState(0);
  // console.log("que no", question);
  const { config } = useContext(DataContext);
  const [data, setData] = useState([]);

  const [seconds, setSeconds] = React.useState(10);

  console.log("data", data);

  const [exam, setExam] = useState([]);
  console.log("exam", exam);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(10);
      if (question === 7) {
        setSeconds(0);
      }
    } else {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(seconds);
      }
    }
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (question === 7) {
        setQuestion(7);
      } else {
        setQuestion(question + 1);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [question]);

  const history = useHistory();
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
          // console.log("Response from Give Exam>>>", response);
          setData(response.data.data);
        }
      });
  }, []);

  const submit = () => {
    axios
      .post(
        `https://nodejsexamination.herokuapp.com/student/giveExam?id=${_id}`,
        exam,
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

  const handleOptionChange = (optionValue, question) => {
    const data = {
      question: question,
      answer: optionValue,
    };
    setExam([...exam, data]);
  };

  return [{ question, data, seconds, submit, handleOptionChange }];
}

export default useGiveExam;
