import React, { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function ExamNew() {
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

  const [index, setIndex] = useState(exam.questions.length);
  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const [value, setValue] = useState("");

  const handleChangee = (event) => {
    setValue(event.target.value);
  };

  const next = () => {
    setIndex(index + 1);
    setExam({
      ...exam,
      questions: [
        ...exam.questions,
        {
          question: "",
          answer: "",
          options: ["", "", "", ""],
        },
      ],
    });
    console.log(exam, "Exam data");
  };

  const handlePrevious = () => {
    console.log("previous");
    setIndex(index - 1);
  };

  const nextQuestion = () => {
    const que = exam.questions[0].question;

    const examQuestionValues = Object.values(exam?.questions).map(
      (ques) => ques.question
    );
    console.log(examQuestionValues, "Exam contains Question Values");

    const questionWithNoDuplicates = examQuestionValues.includes(que);
    console.log(questionWithNoDuplicates, "Question With no Duplicates Values");

    let options = [
      exam.questions[0].options[0],
      exam.questions[0].options[1],
      exam.questions[0].options[2],
      exam.questions[0].options[3],
    ];
    let optionsWithNoDuplicates = Object.keys(
      options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );

    const newQuestion = {
      question: que,
      answer: value,
      options: optionsWithNoDuplicates,
    };

    if (newQuestion.options.length === 4) {
      setExam((prevState) => ({
        ...exam,
        subjectName: exam.subjectName,
        questions: [...prevState.questions, newQuestion],
        notes: exam.notes,
      }));
    } else {
      alert("Same options are not allowed");
      return;
    }

    console.log(exam);

    const length = exam?.questions.length + 1;
    setIndex(length);
    console.log(index);

    document.examForm.reset();
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

  return (
    <div>
      <p>{`Question:- ${index}`}</p>
      <div>
        <label htmlFor="">Subject Name :</label>
        <select
          disabled={index !== 1}
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
      </div>
      <form name="examForm">
        <div>
          <label>Question</label>
          {/* {...exam,questions:[{...exam.questions[index-1],question:e.target.value}],} */}
          <input
            type="text"
            onChange={(e) =>
              setExam((prevState) => {
                exam.questions[0].question = e.target.value;
                console.log(prevState);
                return {
                  ...exam,
                  ...prevState,
                };
              })
            }
          />
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup value={value} onChange={handleChangee}>
              <div>
                <FormControlLabel
                  disabled={!exam.questions[0].options[0]?.length > 0}
                  value={exam.questions[0].options[0]}
                  control={<Radio />}
                  onChange={(e) =>
                    setExam((prevState) => {
                      exam.questions[0].options[0] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
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
                      exam.questions[0].options[0] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
                        ...prevState,
                      };
                    })
                  }
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  disabled={!exam.questions[0].options[1]?.length > 0}
                  value={exam.questions[0].options[1]}
                  control={<Radio />}
                  onChange={(e) =>
                    setExam((prevState) => {
                      exam.questions[0].options[1] = e.target.value;
                      console.log(exam.questions[0].options[1]);
                      return {
                        ...exam,
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
                      exam.questions[0].options[1] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
                        ...prevState,
                      };
                    })
                  }
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  disabled={!exam.questions[0].options[2]?.length > 0}
                  value={exam.questions[0].options[2]}
                  control={<Radio />}
                  onChange={(e) =>
                    setExam((prevState) => {
                      exam.questions[0].options[2] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
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
                      exam.questions[0].options[2] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
                        ...prevState,
                      };
                    })
                  }
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  disabled={!exam.questions[0].options[3]?.length > 0}
                  value={exam.questions[0].options[3]}
                  control={<Radio />}
                  onChange={(e) =>
                    setExam((prevState) => {
                      exam.questions[0].options[3] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
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
                      exam.questions[0].options[3] = e.target.value;
                      console.log(prevState);
                      return {
                        ...exam,
                        ...prevState,
                      };
                    })
                  }
                />
                <br />
              </div>
            </RadioGroup>
          </FormControl>
          <div>
            <label>Answer:</label>
            <input
              type="text"
              id="answer"
              value={value}
              onChange={(e) =>
                setExam((prevState) => {
                  return prevState;
                })
              }
              disabled
            />
          </div>
          <div>
            <label htmlFor="">Notes :</label>
            <input
              onChange={(e) =>
                setExam((prevState) => {
                  exam.notes[0] = e.target.value;
                  console.log(prevState);
                  return {
                    ...exam,
                    ...prevState,
                  };
                })
              }
            />
          </div>
          <div>
            <button disabled={index !== 15}>Submit</button>
          </div>
        </div>
      </form>
      <div>
        <button disabled={index === 1} onClick={handlePrevious}>
          Prev
        </button>
        <button disabled={index === 15} onClick={nextQuestion}>
          Next
        </button>
      </div>
    </div>
    // <div>
    //   {index}
    //   <form action="" onChange={handleChange}>
    //     <label htmlFor="">SubjectName</label>
    //     <input
    //       type="text"
    //       name="subjectName"
    //       onChange={(e) => setExam({ ...exam, subjectName: e.target.value })}
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="">notes</label>
    //     <input
    //       type="text"
    //       name="notes"
    //       onChange={(e) =>
    //         setExam((prevState) => {
    //           exam.notes[0] = e.target.value;
    //           console.log(prevState);
    //           return {
    //             ...prevState,
    //           };
    //         })
    //       }
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="">question</label>
    //     <input
    //       type="text"
    //       name="question"
    //       value={exam.questions[index - 1].question}
    //       onChange={(e) =>
    //         setExam((prevState) => {
    //           const questions = [...prevState.questions];
    //           const subjectName = prevState.subjectName;
    //           const notes = prevState.notes;
    //           questions[index - 1] = {
    //             ...questions[index - 1],
    //             question: e.target.value,
    //           };
    //           return { subjectName, questions, notes };
    //         })
    //       }
    //     />
    //     <br />
    //     <br />
    //     <label htmlFor="">answer</label>
    //     <input type="text" name="answer" />
    //     <br />
    //     <br />
    //     <label htmlFor="">option 1</label>
    //     <input type="text" name="option1" />
    //     <br />
    //     <br />
    //     <label htmlFor="">option 2</label>
    //     <input type="text" name="option2" />
    //     <br />
    //     <br />
    //     <label htmlFor="">option 3</label>
    //     <input type="text" name="option3" />
    //     <br />
    //     <br />
    //     <label htmlFor="">option 4</label>
    //     <input type="text" name="option4" />
    //     <br />
    //     <br />
    //   </form>
    //   <button>Prev</button>
    //   <button>Submit</button>
    //   <button>Clear</button>
    //   <button onClick={next}>Next</button>
    // </div>
  );
}

export default ExamNew;
