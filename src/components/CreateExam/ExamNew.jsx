import React, { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";

function ExamNew() {
  const { config } = useContext(DataContext);

  const [exam, setExam] = useState({
    subjectName: "",
    questions: [
      {
        // question: "",
        // answer: "",
        options: ["", "", "", ""],
      },
    ],
    notes: [],
  });

  const [index, setIndex] = useState(exam?.questions?.length);

  const [value, setValue] = useState();

  const handleChange = (event) => {
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
        setExam({ ...exam, response });
        alert("Exam Created Successfully!");
        console.log(response);
      });
    console.log(exam);
  };

  const nextQuestion = () => {
    const qvalue = exam.questions.map((o) => o.question).valueOf(index);
    console.log(qvalue);
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

    console.log(value, "value name");
    const newQuestion = {
      question: que,
      answer: value,
      options: optionsWithNoDuplicates,
    };
    if (qvalue === que) {
      return;
    } else {
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
    }

    console.log(exam);
    const length = exam?.questions.length + 1;
    setIndex(length);
    console.log(index);
  };

  const updateItem = (prop, event, index) => {
    const old = exam?.questions[index];
    const updated = { ...old, [prop]: event.target.value };
    const clone = [...exam?.questions];
    clone[index] = updated;
    console.log("clone", clone);
    setExam({ ...exam, questions: clone });
  };

  const updateOptions = (prop, event, index) => {
    // const old = exam?.questions[index]?.options;
    // const updated = { ...old, [prop]: event.target.value };
    // const clone = [...exam?.questions.map((o) => o.options)];
    // clone[index] = updated;
    // setExam({ ...exam, options: clone });
    // console.log(clone);
    var options = Object.assign({}, exam.questions.options);
    options[index] = event.target.value;
    setExam({ options: options });
  };

  const reset = () => {
    document.examForm.reset();
  };

  const g = exam?.questions[0]?.options?.map((i) => i);
  console.log("value", value);
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
                  {/* <input
                    type="text"
                    name={u}
                    onChange={(e) =>
                      setExam((prevState) => {
                        _ = e.target.value;
                        console.log(prevState);
                        setValue(e.target.value);
                        return {
                          ...prevState,
                        };
                      })
                    }
                  /> */}
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
                    disabled={!g[u].length > 0}
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

export default ExamNew;
