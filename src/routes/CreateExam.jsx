import React, { useState, useEffect } from "react";
import axios from "axios";

let questionsArray = [];
const sta = {
  subjectName: "MPIP",
  question: "",
  answer: null,
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answers: "",
};
const NCreateExam = () => {
  const token = JSON.parse(localStorage.getItem("Token"));

  const [allExam, setAllExam] = useState([]);
  let localExamAll = [];

  const [exam, setExam] = useState(sta);

  const [currentState, setCurrentState] = useState(1);

  const [buttonName, setButtonName] = useState("ADD");

  const [errorMsg, setErrorMsg] = useState("");

  //const [questionArray, setQuestionArray] = useState([]);

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const clearData = () => {
    setExam(sta);
  };

  const distinct = (v, i, s) => {
    return s.indexOf(v) === i;
  };

  const addExam = () => {
    let optionArray = [];
    optionArray.push(exam.option1, exam.option2, exam.option3, exam.option4);
    //console.log("optionArray", optionArray);

    const distinctOptions = optionArray.filter(distinct);
    //console.log("distinctOptions", distinctOptions);

    questionsArray.push(exam.question);
    console.log("questionsArray : original :", questionsArray);
    const distinctQuestion = questionsArray.filter(distinct);
    //console.log("distinctQuestion", distinctQuestion);

    if (
      exam.question == "" ||
      exam.option1 == "" ||
      exam.option2 == "" ||
      exam.option3 == "" ||
      exam.option4 == "" ||
      exam.answer == null
    ) {
      setErrorMsg("Please fill all the data!");
      questionsArray.pop();
    } else {
      if (optionArray.length !== distinctOptions.length) {
        alert("All the options must be different!");
        questionsArray.pop();
      } else {
        setErrorMsg("");
        if (currentState === allExam.length + 1) {
          if (questionsArray.length !== distinctQuestion.length) {
            alert("All the questions must be different!");
            questionsArray.pop();
          } else {
            let final = {
              question: exam.question,
              answer: exam.answer,
              options: [exam.option1, exam.option2, exam.option3, exam.option4],
            };

            setAllExam([...allExam, final]);

            setCurrentState(allExam.length + 2);
            clearData();
          }
        } else {
          let final = {
            question: exam.question,
            answer: exam.answer,
            options: [exam.option1, exam.option2, exam.option3, exam.option4],
          };

          allExam.splice(currentState - 1, 1, final);
          questionsArray.splice(currentState - 1, 1);
          localStorage.setItem("CreateExam", JSON.stringify(allExam));
        }
      }
    }
  };

  useEffect(() => {
    if (allExam.length) {
      localStorage.setItem("CreateExam", JSON.stringify(allExam));
      console.log("hi", allExam);
      localExamAll = JSON.parse(localStorage.getItem("CreateExam"));
      console.log("localExamAll", localExamAll);
      //console.log('exam.subjectName', exam.subjectName);
    }
    if (allExam.length >= 14) {
      setButtonName("SUBMIT");
    }
    if (allExam.length > 14) {
      console.log("localExamAll", localExamAll);
      const payload = {
        subjectName: exam.subjectName,
        questions: localExamAll,
        notes: ["10mins exam", "start time 10am"],
      };

      axios
        .post(
          "https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam",
          payload,
          {
            headers: {
              "access-token": token,
              Accept: "*/*",
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
        });
    }
  }, [addExam]);

  const prevButton = () => {
    //questionsArray[currentState];
    setCurrentState(currentState - 1);
    let pre = localExamAll[currentState - 2];
    console.log("pre", pre.answer);
    setButtonName("UPDATE");
    setExam({
      question: pre.question,
      answer: pre.answer,
      option1: pre.options[0],
      option2: pre.options[1],
      option3: pre.options[2],
      option4: pre.options[3],
      answers: pre.answer,
    });
    /* questionsArray.splice(currentState - 2, 1);
    console.log('questionsArray', questionsArray); */
  };

  const nextButton = () => {
    setCurrentState(currentState + 1);
    let next = localExamAll[currentState];
    console.log("next", next);
    setButtonName("UPDATE");
    setExam({
      question: next.question,
      answer: next.answer,
      option1: next.options[0],
      option2: next.options[1],
      option3: next.options[2],
      option4: next.options[3],
      answers: next.answer,
    });
    /*  questionsArray.splice(currentState, 1);
    console.log('questionsArray', questionsArray); */
  };
  /* const submitButton = () => {
        
    }  */

  return (
    <div>
      <h2>CreateExam</h2>

      <br />
      <b>{/* <h2>{errorMsg}</h2> */}</b>
      <br />

      <form>
        <div>
          <label htmlFor="">Subject Name :</label>
          <select
            name="subjectName"
            value={exam.subjectName}
            onChange={onChangeUser}
          >
            <option value="DSP">DSP</option>
            <option value="OS">OS</option>
            <option value="DS">DS</option>
            <option value="EDC">EDC</option>
            <option value="SE">SE</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <label>Subject Name : </label>
        <select
          name="subjectName"
          value={exam.subjectName}
          onChange={onChangeUser}
        >
          <option value="DSP">DSP</option>
          <option value="OS">OS</option>
          <option value="DS">DS</option>
          <option value="EDC">EDC</option>
          <option value="SE">SE</option>
          <option value="ST">ST</option>
        </select>
        <br />
        <br />
        <label>Question : </label>
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
        <br />
        <br />
        <input type="button" value={buttonName} onClick={addExam} />
        <br />
        <br />
        {/* <input
          type="button"
          value="Prev"
          onClick={prevButton}
          disabled={currentState <= 1}
        /> */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          className="btn btn-primary"
          type="button"
          value="Next"
          onClick={nextButton}
          disabled={currentState >= allExam.length}
        />
        <br />
        <br />
      </form>
    </div>
  );
};

export default NCreateExam;

//------------------------------edit exam------------------------------

//  {examDetail.map((i, index) => (
//         <form key={index}>
//           <label>Question : <b>{index + 1}</b> </label>
//           <input
//             type="text"
//             name="question"
//             defaultValue={i.question}
//             //onChange={onChangeUser}
//           />
//           <br />
//           <br />

//           <label>Options : </label>
//           <input
//             type="radio"
//             name="answer"
//             defaultValue={i.options[0]}
//             //onChange={onChangeUser}
//             checked={i.options[0] == i.answer}
//           />
//           <input
//             type="text"
//             name="option1"
//             defaultValue={i.options[0]}
//            // onChange={onChangeUser}
//           />
//           <br />
//           <br />

//           <input
//             type="radio"
//             name="answer"
//             defaultValue={i.options[1]}
//             //onChange={onChangeUser}
//             checked={i.options[1] == i.answer}
//           />
//           <input
//             type="text"
//             name="option2"
//             defaultValue={i.options[1]}
//            // onChange={onChangeUser}
//           />
//           <br />
//           <br />

//           <input
//             type="radio"
//             name="answer"
//             defaultValue={i.options[2]}
//             //onChange={onChangeUser}
//             checked={i.options[2] == i.answer}
//           />
//           <input
//             type="text"
//             name="option3"
//             defaultValue={i.options[2]}
//            // onChange={onChangeUser}
//           />
//           <br />
//           <br />

//           <input
//             type="radio"
//             name="answer"
//             defaultValue={i.options[3]}
//             //onChange={onChangeUser}
//             checked={i.options[3] == i.answer}
//           />
//           <input
//             type="text"
//             name="option4"
//             defaultValue={i.options[3]}
//            // onChange={onChangeUser}
//           />
//           <br />
//           <br />

//           <label>Answer : </label>
//         <input
//           type="text"
//           name="answers"
//           value={i.answer}
//           //onChange={onChangeUser}
//         />
//         <br />
//         <br />

//           <hr />
//         </form>

//       ))}
