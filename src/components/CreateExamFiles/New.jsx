import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function New() {
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
    notes: [""],
  });

  const [index, setIndex] = useState(1);

  const [value, setValue] = useState("");

  const handleChange = (event) => {
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

  const add = () => {
    const question = exam.questions[0].question;
    const answer = exam.questions[0].answer;

    let options = [
      exam.questions[0].options[0],
      exam.questions[0].options[1],
      exam.questions[0].options[2],
      exam.questions[0].options[3],
    ];

    let noDuplicateOptions = Object.keys(
      options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );

    const newData = {
      question: question,
      answer: answer,
      options: noDuplicateOptions,
    };

    if (newData.options.length === 4) {
      // setExam([...exam.questions, exam?.questions?.push(newData)]);
      setExam((prevState) => ({
        subjectName: exam.subjectName,
        questions: [...prevState.questions, newData],
        notes: exam.notes,
      }));
    } else {
      alert("Same options are not allowed");
      return;
    }

    const length = exam?.questions.length + 1;
    setIndex(length);
    console.log(index);
    console.log(exam, "Exam Data");

    // exam?.questions?.push({
    //   question: exam.questions[0].question,
    //   answer: exam.questions[0].answer,
    //   options: [
    //     exam.questions[0].options[0],
    //     exam.questions[0].options[1],
    //     exam.questions[0].options[2],
    //     exam.questions[0].options[3],
    //   ],
    // });
  };

  const previous = () => {
    setExam({ index: exam.questions - 1 });
  };

  const reset = () => {
    // document.questions.reset();
    const list = ["apple", "banana", "orange", "strawberry"];

    const items = list.slice(0, 1);
    console.log(items, "kk");
  };

  return (
    <div>
      <h1>Create Exam</h1>
      <b>Question : - {index} </b>
      <br />
      <br />
      <form>
        <label htmlFor="">SubjectName</label>
        <select
          name="subjectName"
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
        <label htmlFor="">Notes</label>
        <input
          type="text"
          name="notes"
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
        <br />
        <label htmlFor="">Question</label>
        <input
          type="text"
          name="question"
          onChange={(e) =>
            setExam((prevState) => {
              exam.questions[0].question = e.target.value;
              console.log(prevState);
              return {
                ...prevState,
              };
            })
          }
        />
        <br />
        <label htmlFor="">Answer</label>
        <input
          type="text"
          name="answer"
          onChange={(e) =>
            setExam((prevState) => {
              exam.questions[0].answer = e.target.value;
              console.log(prevState);
              return {
                ...prevState,
              };
            })
          }
        />
        <br /> 
        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <div>
              <FormControlLabel
                // value={exam?.questions[0]?.options[0]}
                // disabled={!exam?.questions[0]?.options[0]}
                control={<Radio />}
                label="Option 1"
              />
              <input
                type="text"
                name="options"
                onChange={(e) =>
                  setExam((prevState) => {
                    exam.questions[0].options[0] = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </div>
            <div>
              <FormControlLabel
                // value={exam?.questions[0]?.options[1]}
                // disabled={!exam?.questions[0]?.options[1]}
                control={<Radio />}
                label="Option 2"
              />
              <input
                type="text"
                name="options"
                onChange={(e) =>
                  setExam((prevState) => {
                    exam.questions[0].options[1] = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </div>
            <div>
              <FormControlLabel
                // value={exam?.questions[0]?.options[2]}
                // disabled={!exam?.questions[0]?.options[2]}
                control={<Radio />}
                label="Option 3"
              />
              <input
                type="text"
                name="options"
                onChange={(e) =>
                  setExam((prevState) => {
                    exam.questions[0].options[2] = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </div>
            <div>
              <FormControlLabel
                // value={exam?.questions[0]?.options[3]}
                // disabled={!exam?.questions[0]?.options[3]}
                control={<Radio />}
                label="Option 4"
              />
              <input
                type="text"
                name="options"
                onChange={(e) =>
                  setExam((prevState) => {
                    exam.questions[0].options[3] = e.target.value;
                    return {
                      ...prevState,
                    };
                  })
                }
              />
            </div>
          </RadioGroup>
        </FormControl>
        <br />
      </form>
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
          onClick={add}
          value="Next Question"
        />
      </div>
    </div>
  );
}

export default New;
