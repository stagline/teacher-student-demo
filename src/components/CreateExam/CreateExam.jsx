import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import useCreateExam from "./useCreateExam";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function CreateExam() {
  // const [state, setState] = useState({
  //     data: {
  //         subjectName: "",
  //         questions: [{ question: "questionq", answer: "answer", options: ["sdf", "sdf", "sdf", "sdf"] }],
  //         "notes": [
  //             "10mins exam",
  //             "start time 10am"
  //         ]
  //     }
  // })

  // const jjj = (e) => {
  //     e.preventDefault()
  //     setState(prevState => ({
  //         data: { ...prevState.data, questions: [...prevState.data.questions, { question: e.target.value, answer: e.target.value, options: ["an1", "ans3", "ans2", "ans3"] }] }
  //     }))
  //     console.log(state?.data)
  // }

  // const handleSubmit = e => {
  //     e.preventDefault()
  //     console.log(state)
  // }

  // const handleChange = e => {
  //     // setState({ ...state, [e.target.name]: e.target.value })
  //     setState([...state, { [e.target.name]: e.target.value }])
  // }

  const { config } = useContext(DataContext);

  const [exam, setExam] = useState({
    subjectName: "",
    questions: [],
    notes: [""],
  });

  const [index, setIndex] = useState(1);

  const [value, setValue] = useState("");

  const [item, setItem] = useState([
    {
      question: "",
      answer: "",
      options: [],
    },
  ]);

  const handleChangee = (event) => {
    setValue(event.target.value);
  };

  const submitExam = (e) => {
    debugger;
    e.preventDefault();
    axios
      .post(
        "https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam",
        exam,
        config
      )
      .then((response) => {
        setExam({ response });
        alert("Exam Created Successfully!");
        console.log(response);
      });
    console.log(exam);
  };

  const nextQuestion = () => {
    const que = item[0].question;

    const examQuestionValues = Object.values(exam?.questions).map(
      (ques) => ques.question
    );
    console.log(examQuestionValues, "Exam contains Question Values");

    const questionWithNoDuplicates = examQuestionValues.includes(que);
    console.log(questionWithNoDuplicates, "Question With no Duplicates Values");

    let options = [
      item[0].options[1],
      item[0].options[2],
      item[0].options[3],
      item[0].options[4],
    ];
    let optionsWithNoDuplicates = Object.keys(
      options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );

    const newQuestion = {
      question: que,
      answer: value,
      options: optionsWithNoDuplicates,
    };

    if (questionWithNoDuplicates === true) {
      alert("Same Questions are not allowed");
      return;
    } else {
      if (newQuestion.options.length === 4) {
        exam?.questions?.push(newQuestion);
      } else {
        alert("Same options are not allowed");
        return;
      }
    }
    console.log(exam);

    const length = exam?.questions.length + 1;
    setIndex(length);
    console.log(index);

    // document.questions.reset()

    // if (exam?.questions.every(x => !(x['que'] == que))) { }

    // // exam?.questions?.push({ question: que, answer: value, options: [item[0].options[1], item[0].options[2], item[0].options[3], item[0].options[4]] })

    // let options = [item[0].options[1], item[0].options[2], item[0].options[3], item[0].options[4]]
    // let optionsWithNoDuplicates = Object.keys(options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {}))

    // const newQuestion = { question: que, answer: value, options: optionsWithNoDuplicates }
    // // exam?.questions?.push(newQuestion)

    // if (newQuestion.options.length === 4) {
    //     exam?.questions?.push(newQuestion)
    //     const length = exam?.questions.length + 1
    //     setIndex(length)
    //     console.log(index)
    // } else {
    //     alert("Same Options are not allowed")
    // }
  };

  const previous = () => {
    // const length = index - 1
    // setIndex(length)
    // console.log(exam)
    // console.log(index)
    setExam({ index: exam.questions - 1 });
    // setIndex(exam)
  };

  const reset = () => {
    document.questions.reset();
  };

  return (
    <div>
      <h1>Create Exam</h1>
      <b>Question : - {index} </b>
      <br />
      <br />
      {/* {JSON.stringify(value)} */}
      {/* {JSON.stringify(exam)} */}
      <form name="subject">
        <label htmlFor="">Subject Name :</label>
        <select
          onChange={(e) =>
            setExam((prevState) => {
              exam.subjectName = e.target.value;
              console.log(prevState);
              return {
                ...prevState,
              };
            })
          }
        >
          <option value="Operating Systems">Operating Systems</option>
          <option value="Data Structures">Data Structures</option>
          <option value="DSP">DSP</option>
          <option value="Data Communication">Data Communication</option>
          <option value="RTES">RTES</option>
        </select>
        <br />
        <br />
        <label htmlFor="">Notes :</label>
        <input
          onChange={(e) =>
            setExam((prevState) => {
              exam.notes[0] = e.target.value;
              console.log(prevState);
              return {
                ...prevState,
              };
            })
          }
        />
        {/* <label htmlFor="">Questions :</label>
                <input type="text" name="question" onChange={(e) => setExam((prevState) => {
                    exam.questions[0].question = e.target.value;
                    console.log(prevState)
                    return ({
                        ...prevState
                    })
                }
                )} />
                <br /><br />
                <label htmlFor="">Aswer : </label>
                <input type="text" name="answer" onChange={(e) => setExam((prevState) => {
                    exam.questions[0].answer = e.target.value;
                    console.log(prevState)
                    return ({
                        ...prevState
                    })
                }
                )} /> */}
        <br />
        <br />
        {/* <label htmlFor="">Options :</label> */}
        {/* <>
                    <div>
                        option 1 : <input type="radio" name="option1" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[0] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                    <div>
                        option 2 :  <input type="radio" name="option2" />
                    </div>
                    <div>
                        option 3 :  <input type="radio" name="option3" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[2] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                    <div>
                        option 4 :  <input type="radio" name="option4" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[3] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                </> */}
        {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Options</FormLabel>
                    <RadioGroup value={value} onChange={handleChangee}>
                        <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="Option 3" control={<Radio />} label="Option 3" />
                        <FormControlLabel value="Option 4" control={<Radio />} label="Option 4" />
                    </RadioGroup>
                </FormControl> */}
        {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Options</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangee}>
                        <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="Option 3" control={<Radio />} label="Option 3" />
                        <FormControlLabel value="Option 4" control={<Radio />} label="Option 4" />
                    </RadioGroup>
                </FormControl> */}
        {/* {JSON.stringify(value)} */}
      </form>
      <form name="questions">
        <label htmlFor="">Question :</label>
        <input
          type="text"
          onChange={(e) =>
            setItem((prevState) => {
              item[0].question = e.target.value;
              console.log(prevState);
              return {
                ...prevState,
              };
            })
          }
        />
        <br />
        <br />
        <label htmlFor="">Answer :</label>
        <input type="text" value={value} readOnly />
        <br />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup value={value} onChange={handleChangee}>
            <div>
              <FormControlLabel
                disabled={!item[0].options[1]?.length > 0}
                value={item[0].options[1]}
                control={<Radio />}
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[1] = e.target.value;
                    console.log(prevState[0].options[1]);
                    return {
                      ...prevState,
                    };
                  })
                }
              />{" "}
              <input
                type="text"
                name="option1"
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[1] = e.target.value;
                    console.log(prevState);
                    return {
                      ...prevState,
                    };
                  })
                }
              />
              <br />
            </div>
            <div>
              <FormControlLabel
                disabled={!item[0].options[2]?.length > 0}
                value={item[0].options[2]}
                control={<Radio />}
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[2] = e.target.value;
                    console.log(prevState[0].options[2]);
                    return {
                      ...prevState,
                    };
                  })
                }
              />{" "}
              <input
                type="text"
                name="option2"
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[2] = e.target.value;
                    console.log(prevState);
                    return {
                      ...prevState,
                    };
                  })
                }
              />
              <br />
            </div>
            <div>
              <FormControlLabel
                disabled={!item[0].options[3]?.length > 0}
                value={item[0].options[3]}
                control={<Radio />}
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[3] = e.target.value;
                    console.log(prevState[0].options[3]);
                    return {
                      ...prevState,
                    };
                  })
                }
              />{" "}
              <input
                type="text"
                name="option3"
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[3] = e.target.value;
                    console.log(prevState);
                    return {
                      ...prevState,
                    };
                  })
                }
              />
              <br />
            </div>
            <div>
              <FormControlLabel
                disabled={!item[0].options[4]?.length > 0}
                value={item[0].options[4]}
                control={<Radio />}
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[4] = e.target.value;
                    console.log(prevState[0].options[4]);
                    return {
                      ...prevState,
                    };
                  })
                }
              />{" "}
              <input
                type="text"
                name="option4"
                onChange={(e) =>
                  setItem((prevState) => {
                    item[0].options[4] = e.target.value;
                    console.log(prevState);
                    return {
                      ...prevState,
                    };
                  })
                }
              />
              <br />
            </div>
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div style={{ display: "inline-flex", margin: "10px" }}>
          <input
            className="btn btn-primary"
            type="button"
            onClick={previous}
            value="Previous Question"
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="button"
            value="reset"
            onClick={reset}
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="submit"
            onClick={submitExam}
            value="Submit Exam"
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="button"
            onClick={nextQuestion}
            value="Next Question"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExam;
