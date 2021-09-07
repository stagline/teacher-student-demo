import React, { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

function Nee() {
  const { config } = useContext(DataContext);

  const [exam, setExam] = useState({
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: ["", "", "", ""],
      },
    ],
    notes: [],
  });

  const [index, setIndex] = useState(exam?.questions?.length);

  const [value, setValue] = useState("Answer1");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePrevious = () => {
    console.log("previous");
    setIndex(index - 1);
  };

  const submitExam = (e) => {
    e.preventDefault();
    debugger;
    axios
      .post(
        "https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam",
        exam,
        config
      )
      .then((response) => {
        setExam({ ...exam, response });
        alert("Exam Created Successfully!");
        console.log(response);
      });
    console.log(exam);
  };

  const nextQuestion = () => {
    const que = exam?.questions?.[0]?.question;

    const examQuestionValues = Object.values(exam?.questions).map(
      (ques) => ques.question
    );
    console.log(examQuestionValues, "Exam contains Question Values");

    const questionWithNoDuplicates = examQuestionValues.includes(que);
    console.log(questionWithNoDuplicates, "Question With no Duplicates Values");

    let options = [g?.[0], g?.[1], g?.[2], g?.[3]];
    let optionsWithNoDuplicates = Object.keys(
      options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );
    console.log(value, "value");

    console.log(value, "value name");
    const newQuestion = {
      question: que,
      answer: value,
      options: optionsWithNoDuplicates,
    };
    if (newQuestion.options.length === 4) {
      console.log(newQuestion, "oooo");
      {
        setExam((prevState) => ({
          subjectName: exam.subjectName,
          questions: [...prevState.questions, newQuestion],
          notes: exam.notes,
        }));
      }
    } else {
      alert("Same options are not allowed");
      return;
    }

    console.log(exam);
    const length = exam?.questions.length + 1;
    setIndex(length);
    console.log(index);

    // document.examForm.reset();

    // if (exam?.questions.every(x => !(x['que'] == que))) { }

    // exam?.questions?.push({ question: que, answer: value, options: [item[0].options[1], item[0].options[2], item[0].options[3], item[0].options[4]] })

    // let options = [
    //   exam.questions[0].options[0],
    //   exam.questions[0].options[1],
    //   exam.questions[0].options[2],
    //   exam.questions[0].options[3],
    // ];
    // let optionsWithNoDuplicates = Object.keys(
    //   options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    // );

    // const newQuestion = {
    //   question: que,
    //   answer: value,
    //   options: optionsWithNoDuplicates,
    // };
    // // exam?.questions?.push(newQuestion)

    // if (newQuestion.options.length === 4) {
    //   exam?.questions?.push(newQuestion);
    //   const length = exam?.questions.length + 1;
    //   setIndex(length);
    //   console.log(index);
    // } else {
    //   alert("Same Options are not allowed");
    // }
    // console.log(exam);
  };

  const updateItem = (prop, event, index) => {
    const old = exam?.questions[index];
    const updated = { ...old, [prop]: event.target.value };
    const clone = [...exam?.questions];
    clone[index] = updated;
    console.log("clone", clone);
    setExam({ ...exam, questions: clone });
  };

  const reset = () => {
    document.examForm.reset();
  };

  const g = exam?.questions[0]?.options?.map((i) => i);

  return (
    <div>
      <p>{`Question:- ${index}`}</p>
      <form name="examForm">
        <div>
          <div>
            <label htmlFor="">Subject Name :</label>
            <select
              // disabled={index !== 1}
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
              <option value="Exam987">Exam987</option>
              <option value="Exam456">Exam456</option>
              <option value="Exam101">Exam101</option>
            </select>
          </div>
          <div>
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
          </div>
          {/* <label>Question</label> */}

          {exam?.questions?.map((item, i) => (
            <div key={i}>
              <label htmlFor="">Questions :</label>
              <input onChange={(e) => updateItem("question", e, i)} />
              <br />
              <br />
              <label htmlFor="">Answer :</label>
              <input onChange={(e) => updateItem("answer", e, i)} />
              <br />
              <label htmlFor="">Options</label>
              <br />
              {item?.options?.map((_, u) => (
                <>
                  <FormControlLabel
                    control={<Radio />}
                    onChange={(e) =>
                      setExam((prevState) => {
                        g[u] = e.target.value;
                        console.log(prevState);
                        setValue(e.target.value);
                        return {
                          ...prevState,
                        };
                      })
                    }
                    // value={_.option}
                  />
                  <input
                    type="text"
                    // name={"option" + i}
                    // id={_.id}
                    onChange={(e) =>
                      setExam((prevState) => {
                        exam.questions[0].options[u] = e.target.value;
                        console.log(prevState);
                        return {
                          ...prevState,
                        };
                      })
                    }
                    // onChange={(e) => updateOptions("options", e, i)}
                    // value={_.[u]}
                  />
                  <br />
                </>
              ))}
            </div>
          ))}
          {/* {exam?.questions?.length &&
              exam?.questions?.map((_item, i) => {
                console.log(_item,"oopopoop")
                _item?.options?.map((_, is) => {
                  return (
                    <>
                      <FormControlLabel
                        control={<Radio />}
                        
                        value={_.option}
                      />
                      <input
                        type="text"
                        name={"option" + i}
                        id={_.id}
                        onChange={(e) => updateOptions("options", e, i)}
                        value={_.option}
                      />
                      <br />
                    </>
                  );
                });
              })} */}
          {/* <input
              type="text"
              onChange={(e) =>
                setExam((prevState) => {
                  exam.questions[0].question = e.target.value;
                  console.log(prevState);
                  return {
                    ...prevState,
                  };
                })
              }
            /> */}
        </div>
        {/* <div>
            <label>Answer:</label>
            <input type="text" value={value} />
          </div> */}
        <div>
          {/* <FormControl component="fieldset">
              <FormLabel component="legend">Options</FormLabel>
              <RadioGroup value={value} onChange={handleChange}>
                <div>
                  <FormControlLabel
                    disabled={!g?.[0]?.length > 0}
                    value={g?.[0]}
                    control={<Radio />}
                    onChange={(e) =>
                      setExam((prevState) => {
                        // g[0] = e.target.value;
                        console.log(prevState);
                        setValue(e.target.value);
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
                      setExam((prevState) => {
                        exam.questions = e.target.value;
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
                    disabled={!g?.[1]?.length > 0}
                    value={g?.[1]}
                    control={<Radio />}
                    onChange={(e) =>
                      setExam((prevState) => {
                        g[1] = e.target.value;
                        console.log(g[1]);
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
                      setExam((prevState) => {
                        exam.questions = e.target.value;
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
                    disabled={!g?.[2]?.length > 0}
                    value={g?.[2]}
                    control={<Radio />}
                    onChange={(e) =>
                      setExam((prevState) => {
                        g[2] = e.target.value;
                        console.log(prevState);
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
                      setExam((prevState) => {
                        exam.questions = e.target.value;
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
                    disabled={!g?.[3]?.length > 0}
                    value={g?.[3]}
                    control={<Radio />}
                    onChange={(e) =>
                      setExam((prevState) => {
                        g[3] = e.target.value;
                        console.log(prevState);
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
                      setExam((prevState) => {
                        exam.questions = e.target.value;
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
            </FormControl> */}
        </div>
      </form>
      <div style={{ display: "inline-flex", margin: "10px" }}>
        <input
          className="btn btn-primary"
          type="button"
          onClick={handlePrevious}
          value="Previous Question"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          type="button"
          onClick={reset}
          value="reset"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          onClick={submitExam}
          type="submit"
          value="Submit Exam"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          disabled={index === 15}
          type="button"
          onClick={nextQuestion}
          value="Next Question"
        />
      </div>
    </div>
  );
}

export default Nee;
