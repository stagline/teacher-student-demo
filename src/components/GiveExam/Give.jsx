import React, { useEffect } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";

function Give() {
  const questionData = [
    {
      id: 0,
      question: ` What is the Capital Of India ?`,
      options: [`New Delhi`, `Mumbai`, `Kolkatta`],
      answer: `New Delhi`,
    },
    {
      id: 1,
      question: `Who is the CEO of Tesla Motors?`,
      options: [`Bill Gates`, `Steve Jobs`, `Elon Musk`],
      answer: `Elon Musk`,
    },
    {
      id: 3,
      question: `Name World's Richest Man?`,
      options: [`Jeff Bezo`, `Bill Gates`, `Mark Zuckerberg`],
      answer: `Jeff Bezo`,
    },
    {
      id: 4,
      question: `World's Longest River?`,
      options: [`River Nile`, `River Amazon`, `River Godavari`],
      answer: `River Nile`,
    },
  ];
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
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(10);
    }
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Run every 10 second!");
      if (question === 7) {
        setQuestion(7);
      } else {
        setQuestion(question + 1);

        // setQuestion(question + 1);
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
          console.log("Response from Give Exam>>>", response);
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
    console.log("optionValue", optionValue);
    const data = {
      question: question,
      answer: optionValue,
    };
    setExam([...exam, data]);
  };

  return (
    <div>
      <React.Fragment>
        <h3></h3>
        <b>
          {question === 7 ? null : <p>Question Number : {question + 1}</p>}
          <br />
          <p>{data[question]?.question}</p>
          {/* {!question ? (
            "Loading..."
          ) : ( */}
          <>
            {question < 7 ? (
              <div>You Have Time Left : {seconds}</div>
            ) : (
              <button onClick={submit}>Submi</button>
            )}
          </>
          {/* )} */}
        </b>
        <div>
          {/* {console.log(value.options)} */}
          {data[question]?.options?.map((o, i) => {
            console.log(`key2 value`, o, i);
            return (
              <React.Fragment key={i}>
                <div>
                  <input
                    type="radio"
                    name="options"
                    value={o}
                    //   checked={exam[i]?.answer === o}
                    onChange={(e) =>
                      handleOptionChange(
                        e.target.value,
                        data[question]?.question,
                        data[question]?._id
                      )
                    }
                  />
                  {/* {console.log("ooooo", typeof o)} */}
                  <input name="options" value={o} />
                  <br />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>

      <br />
      {/* <button onClick={submit}>Give Exam</button>  */}
    </div>
  );
}

export default Give;
