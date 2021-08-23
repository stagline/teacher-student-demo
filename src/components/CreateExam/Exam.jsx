import React, { useContext, useState } from "react";
import DataContext from "../../Contexts/DataContext";

function Exam() {
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
  const [checked, setChecked] = useState("");
  const [index, setIndex] = useState(exam.questions.length);
  const handleNext = () => {
    console.log("next");
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
    console.log(exam);
  };

  const handlePrevious = () => {
    console.log("previous");
    setIndex(index - 1);
  };

  const handleClear = () => {
    console.log("clear");
  };

  const handleUpdate = () => {
    console.log("update");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(exam);
  };

  return (
    <div>
      <p>{`Question:- ${index}`}</p>
      <div>
        <label>SubjectName</label>
        <select
          disabled={index !== 1}
          value={exam.subjectName}
          name="subjectName"
          onChange={(e) => setExam({ ...exam, subjectName: e.target.value })}
        >
          <option value="Exam1">Exam1</option>
          <option value="Exam2">Exam2</option>
          <option value="Exam3">Exam3</option>
          <option value="Exam4">Exam4</option>
          <option value="Exam5">Exam5</option>
          <option value="Exam6">Exam6</option>
          <option value="Exam7">Exam7</option>
          <option value="Exam8">Exam8</option>
          <option value="Exam9">Exam9</option>
          <option value="Exam10">Exam10</option>
        </select>
      </div>
      <form>
        <div>
          <label>Question</label>{" "}
          {/* {...exam,questions:[{...exam.questions[index-1],question:e.target.value}],} */}
          <input
            type="text"
            value={exam.questions[index - 1].question}
            onChange={(e) =>
              setExam((prevState) => {
                const questions = [...prevState.questions];
                const subjectName = prevState.subjectName;
                const notes = prevState.notes;
                questions[index - 1] = {
                  ...questions[index - 1],
                  question: e.target.value,
                };
                return { subjectName, questions, notes };
              })
            }
          />
        </div>
        <div>
          <label>Options</label>
          {/*setQuestion({ ...question, options: Object.values({ ...question.options, 0: e.target.value }) })*/}
          <div>
            {/*setQuestion({ ...question, options: Object.values({ ...question.options, 0: e.target.value }) })*/}
            <input
              onClick={() => setChecked("1")}
              type="radio"
              checked={checked === "1"}
              name="option"
              // value={
              //   exam.questions[index - 1].options[0] &&
              //   exam.questions[index - 1].options[0]
              // }
              onChange={(e) =>
                setExam((prevState) => {
                  const questions = [...prevState.questions];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  questions[index - 1] = {
                    ...questions[index - 1],
                    answer: e.target.value,
                  };
                  return { subjectName, questions, notes };
                })
              }
            />
            <input
              type="text"
              // value={exam.questions[index - 1].options[0]}
              onChange={(e) =>
                setExam((prevState) => {
                  const optionArr = Object.values({
                    ...prevState.questions[index - 1].options,
                    0: e.target.value,
                  });
                  const questions = [
                    ...prevState.questions,
                    (prevState.questions[index - 1].options = optionArr),
                  ];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  return { questions, subjectName, notes };
                })
              }
            />
          </div>
          <div>
            <input
              onClick={() => setChecked("2")}
              type="radio"
              checked={checked === "2"}
              name="option"
              // value={exam.questions[index - 1].options[1]}
              onChange={(e) =>
                setExam((prevState) => {
                  const questions = [...prevState.questions];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  questions[index - 1] = {
                    ...questions[index - 1],
                    answer: e.target.value,
                  };
                  return { subjectName, questions, notes };
                })
              }
            />
            <input
              type="text"
              // value={exam.questions[index - 1].options[1]}
              onChange={(e) =>
                setExam((prevState) => {
                  const optionArr = Object.values({
                    ...prevState.questions[index - 1].options,
                    1: e.target.value,
                  });
                  const questions = [
                    ...prevState.questions,
                    (prevState.questions[index - 1].options = optionArr),
                  ];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  return { questions, subjectName, notes };
                })
              }
            />
          </div>
          <div>
            <input
              onClick={() => setChecked("3")}
              type="radio"
              checked={checked === "3"}
              name="option"
              // value={exam.questions[index - 1].options[2]}
              onChange={(e) =>
                setExam((prevState) => {
                  const questions = [...prevState.questions];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  questions[index - 1] = {
                    ...questions[index - 1],
                    answer: e.target.value,
                  };
                  return { subjectName, questions, notes };
                })
              }
            />
            <input
              type="text"
              // value={exam.questions[index - 1].options[2]}
              onChange={(e) =>
                setExam((prevState) => {
                  const optionArr = Object.values({
                    ...prevState.questions[index - 1].options,
                    2: e.target.value,
                  });
                  const questions = [
                    ...prevState.questions,
                    (prevState.questions[index - 1].options = optionArr),
                  ];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  return { questions, subjectName, notes };
                })
              }
            />
          </div>
          <div>
            <input
              onClick={() => setChecked("4")}
              type="radio"
              checked={checked === "4"}
              name="option"
              // value={exam.questions[index - 1].options[3]}
              onChange={(e) =>
                setExam((prevState) => {
                  const questions = [...prevState.questions];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  questions[index - 1] = {
                    ...questions[index - 1],
                    answer: e.target.value,
                  };
                  return { subjectName, questions, notes };
                })
              }
            />
            <input
              type="text"
              // value={exam.questions[index - 1].options[3]}
              onChange={(e) =>
                setExam((prevState) => {
                  const optionArr = Object.values({
                    ...prevState.questions[index - 1].options,
                    3: e.target.value,
                  });
                  const questions = [
                    ...prevState.questions,
                    (prevState.questions[index - 1].options = optionArr),
                  ];
                  const subjectName = prevState.subjectName;
                  const notes = prevState.notes;
                  return { questions, subjectName, notes };
                })
              }
            />
          </div>
          <div>
            <label>Answer:</label>
            <input
              type="text"
              value={exam.questions[index - 1].answer}
              disabled
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              value={exam.notes[index - 1]}
              onChange={(e) =>
                setExam({
                  ...exam,
                  notes: Object.values({
                    ...exam.notes,
                    [index - 1]: e.target.value,
                  }),
                })
              }
            />
          </div>
          <div>
            <button disabled={index !== 15} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
      <div>
        <button disabled={index === 1} onClick={handlePrevious}>
          Prev
        </button>
        <button disabled={index === 15} onClick={handleNext}>
          Next
        </button>
        <button onClick={handleClear}>Clear</button>
        <button disabled={true} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Exam;
