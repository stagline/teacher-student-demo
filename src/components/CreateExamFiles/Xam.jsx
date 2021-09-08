import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AxiosFile from "../reusableComponents/AxiosFile";
import CreateEditExam from "../reusableComponents/CreateEditExam";

const sta = {
  question: "",
  answer: null,
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answers: "",
};
const GiveExam = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  let localExamAll = [];

  const location = useLocation();
  const myLocation = location.search;

  const [exam, setExam] = useState(sta);
  const [currentState, setCurrentState] = useState(1);
  const [buttonName, setButtonName] = useState("Next");

  const [examPaper, setExamPaper] = useState([]);

  const [postExam, setPostExam] = useState([]);

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const getUrl =
    process.env.REACT_APP_API_URL + "student/examPaper" + myLocation;

  useEffect(async () => {
    const { data } = await AxiosFile(
      "get",
      `student/examPaper${myLocation}`,
      null,
      true
    );
    setExamPaper(data);
    localStorage.setItem("ExamData", JSON.stringify(data));

    let first = data[0];
    setExam({
      question: first.question,  
      option1: first.options[0],
      option2: first.options[1],
      option3: first.options[2],
      option4: first.options[3],
    });
  }, []);

  const addAnswer = () => {
    setCurrentState(currentState + 1);
    if (currentState < 7) {
      let next = examPaper[currentState];
      setExam({
        question: next.question,
        option1: next.options[0],
        option2: next.options[1],
        option3: next.options[2],
        option4: next.options[3],
      });

      localExamAll = JSON.parse(localStorage.getItem("ExamData"));
      let f = {
        question: localExamAll[currentState - 1]._id,
        answer: exam.answer,
      };
      console.log("f", f);
      setPostExam([...postExam, f]);
      if (postExam.length == 5) {
        setButtonName("ADD");
      }
      console.log("current : ", currentState);
      console.log("examPaper", examPaper);
    } else {
      let next = examPaper[6];
      localExamAll = JSON.parse(localStorage.getItem("ExamData"));

      setExam({
        question: next.question,
        option1: next.options[0],
        option2: next.options[1],
        option3: next.options[2],
        option4: next.options[3],
      });
      let f = {
        question: localExamAll[6]._id,
        answer: exam.answer,
      };
      console.log("f", f);
      setPostExam([...postExam, f]);
    }
  };

  const submit = async () => {
    console.log("postExam", postExam);
    const { message, statusCode } = await AxiosFile(
      "post",
      `student/giveExam${myLocation}`,
      postExam,
      true
    );
    if (statusCode === 200) {
      alert(message);
    }else{
      alert(message);

    }
  };

  return (
    <div>
      <h1>Give Exam</h1>

      <br />
      <br />

      <CreateEditExam exam={exam} onChangeUser={onChangeUser} />

      <br />
      <br />
      <input
        type="button"
        value={buttonName}
        onClick={addAnswer}
        disabled={currentState > 7}
      />

      <br />
      <br />

      <input
        type="button"
        value="Submit"
        onClick={submit}
        disabled={currentState <= 7}
      />

      <br />
      <br />

      <p>{currentState} / 8</p>
    </div>
  );
};

export default GiveExam;

/* const prevButton = () => {
        console.log('postExam', postExam);
        setCurrentState(currentState - 2);
        setPostCurrentState(postCurrentState - 1);
        console.log('currentState', currentState);
        let pre = postExam[postCurrentState - 1];
        let p = examPaper[currentState - 1];
        console.log("pre", pre);
        //setButtonName("UPDATE");
        setExam({
          question: pre.question,
          answer: pre.answer,
          option1: p.options[0],
          option2: p.options[1],
          option3: p.options[2],
          option4: p.options[3],
          answers: pre.answer
        });

      };  */

/* const nextButton = () => {
        setCurrentState(currentState + 1);
        let next = examPaper[currentState];
        console.log("next", next);
        let n = postExam[currentState];
        setExam({
          question: next.question,
          //answer: n.answer,
          option1: next.options[0],
          option2: next.options[1],
          option3: next.options[2],
          option4: next.options[3],
          //answers: n.answer
        });
      };
 */
{
  /* <input
        type="button"
        value="Prev"
        onClick={prevButton}
        //disabled={currentState <= 1}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="button"
        value="Next"
        onClick={nextButton}
        //disabled={currentState >= allExam.length}
      /> */
}

/* await axios
      .get(getUrl, {
        headers: {
          "access-token": token,
         
        },
      })
      .then((response) => {
        if (response) {
          if (response.data.statusCode === 200) {
            setExamPaper(response.data.data);
            console.log("response", response.data.data);

            localStorage.setItem(
              "ExamData",
              JSON.stringify(response.data.data)
            );

            let first = response.data.data[0];
            setExam({
              question: first.question,
              //answer: first.answer,
              option1: first.options[0],
              option2: first.options[1],
              option3: first.options[2],
              option4: first.options[3],
              //answers: first.answer
            });
          } else {
            alert(response.data.message);
            console.log(response);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      }); */

{
  /* <label>Question : </label>
      <input
        type="text"
        name="question"
        value={exam.question}
        onChange={onChangeUser}
      />
      <br />
      <br />
      <label>Options : </label>
      <input
        type="radio"
        name="answer"
        value={exam.option1}
        onChange={onChangeUser}
        checked={exam.option1 == exam.answer}
      />
      <input
        type="text"
        name="option1"
        value={exam.option1}
        onChange={onChangeUser}
      />
      <br />
      <br />
      <input
        type="radio"
        name="answer"
        value={exam.option2}
        onChange={onChangeUser}
        checked={exam.option2 == exam.answer}
      />
      <input
        type="text"
        name="option2"
        value={exam.option2}
        onChange={onChangeUser}
      />
      <br />
      <br />
      <input
        type="radio"
        name="answer"
        value={exam.option3}
        onChange={onChangeUser}
        checked={exam.option3 == exam.answer}
      />
      <input
        type="text"
        name="option3"
        value={exam.option3}
        onChange={onChangeUser}
      />
      <br />
      <br />
      <input
        type="radio"
        name="answer"
        value={exam.option4}
        onChange={onChangeUser}
        checked={exam.option4 == exam.answer}
      />
      <input
        type="text"
        name="option4"
        value={exam.option4}
        onChange={onChangeUser}
      />
      <br />
      <br />
      <label>Answer : </label>
      <input
        type="text"
        name="answers"
        value={exam.answer}
        onChange={onChangeUser}
      />
 */
}

/* axios
      .post(
        process.env.REACT_APP_API_URL + "student/giveExam" + myLocation,
        postExam,
        {
          headers: {
            "access-token": token,
            
          },
        }
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          alert(response.data.message);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      }); */
