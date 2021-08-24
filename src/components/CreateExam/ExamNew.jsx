import React, { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

function ExamNew() {
  // romoxo8760@flipssl.com
  // pass 123456789
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

  const [value, setValue] = useState("");

  const handleChangee = (event) => {
    setValue(event.target.value);
  };

  const handlePrevious = () => {
    console.log("previous");
    setIndex(index - 1);
  };

  const submitExam = (e) => {
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

  const reset = () => {
    document.examForm.reset();
  };

  return (
    <div>
      <p>{`Question:- ${index}`}</p>
      <form name="examForm">
        <div>
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
          <label>Question</label>
          {/* {...exam,questions:[{...exam.questions[index-1],question:e.target.value}],} */}
          <input
            type="text"
            onChange={(e) =>
              setExam((prevState) => {
                exam.questions[0].question = e.target.value;
                console.log(prevState);
                return {
                  // ...exam,
                  ...prevState,
                };
              })
            }
          />
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            id="answer"
            value={exam.questions[0].options.length >= 1 ? value : ""}
            disabled
          />
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup value={value} onChange={handleChangee}>
              <div>
                <FormControlLabel
                  disabled={
                    !exam.questions[0].options[0]?.length > 0 &&
                    exam.questions[0].options[0].length === 0
                  }
                  value={exam.questions[0].options[0]}
                  control={<Radio />}
                  onChange={(e) =>
                    setExam((prevState) => {
                      exam.questions[0].options[0] = e.target.value;
                      console.log(prevState);
                      return {
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
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
                        // ...exam,
                        ...prevState,
                      };
                    })
                  }
                />
                <br />
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      </form>
      <div style={{ display: "inline-flex", margin: "10px" }}>
        <input
          className="btn btn-primary"
          type="button"
          disabled={index === 1}
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
          disabled={index !== 16}
          onClick={submitExam}
          type="submit"
          value="Submit Exam"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          type="button"
          disabled={index === 16}
          onClick={nextQuestion}
          value="Next Question"
        />
      </div>
    </div>
  );
}

export default ExamNew;
