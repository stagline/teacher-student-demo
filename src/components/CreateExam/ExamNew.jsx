import React, { useEffect, useState, useContext } from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import DataContext from "../../Contexts/DataContext";

function ExamNew() {
  const { config } = useContext(DataContext);
  const [button, setButton] = useState("NEXT");
  const [exam, setExam] = useState({
    subjectName: "",
    questions: [],
    notes: [],
    activeIndex: 0,
  });

  const reusable = exam?.questions?.[exam.activeIndex];

  useEffect(() => {
    setExam({
      ...exam,
      questions: [
        {
          question: "",
          answer: "",
          options: ["", "", "", ""],
        },
      ],
    });
  }, []);
  for (var i = 0; i < exam.questions.length; i += 1) {
    // console.log("ppppp", exam.questions[i].answer.includes(""));
  }
  const next = (e) => {
    e.preventDefault();
    setButton("NEXT");
    const a = JSON.parse(localStorage.getItem("exam"));
    const examQuestionValues = a
      ? Object?.values(a).map((que) => que.question)
      : [];
    const questionWithNoDuplicates = examQuestionValues.includes(
      reusable.question
    );
    let optionsWithNoDuplicates = Object.keys(
      reusable.options?.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );
    // console.log(optionsWithNoDuplicates, "optionsWithNoDuplicates");
    if (exam?.subjectName?.length === 0 || reusable.answer.length === 0) {
      alert("All Required");
      return;
    } else {
      if (questionWithNoDuplicates === true) {
        alert("Same Questions");
        return;
      } else {
        if (optionsWithNoDuplicates.length === 4) {
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
            activeIndex: exam.activeIndex + 1,
          });
        } else {
          alert("Same options");
          return;
        }
      }
    }
    console.log(exam);
    localStorage.setItem("exam", JSON.stringify(exam.questions));
  };

  const previous = () => {
    setButton("UPDATE");
    setExam({
      ...exam,
      activeIndex: exam.activeIndex - 1,
    });
    exam.questions.pop();
    console.log(exam);
  };

  const onChange = (i) => (e) => {
    const { name, value } = e.target;
    const examClone = { ...exam };
    if (name === "options") {
      examClone.questions[examClone.activeIndex][name][i] = value;
    } else if (name === "subjectName") {
      examClone[name] = value;
    } else if (name === "notes") {
      examClone[name] = [value];
    } else {
      examClone.questions[examClone.activeIndex][name] = value;
    }
    setExam(examClone);
  };

  const submit = () => {
    exam.questions.pop();
    const body = {
      subjectName: exam.subjectName,
      questions: exam.questions,
      notes: exam.notes,
    };
    axios
      .post(
        "https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam",
        body,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>Question:- {exam.activeIndex + 1}</p>
      <br />
      <label htmlFor="">Subject Name :</label>
      <select
        disabled={exam.activeIndex != 0}
        type="text"
        name="subjectName"
        onChange={onChange()}
        value={exam.subjectName}
      >
        <option value="Operating Systems">Operating Systems</option>
        <option value="Data Structures">Data Structures</option>
        <option value="DSP">DSP</option>
        <option value="Data Communication">Data Communication</option>
        <option value="DIC">DIC</option>
      </select>
      <br />
      <br />
      <label htmlFor="">Notes</label>
      <input
        disabled={exam.activeIndex <= 13}
        type="text"
        name="notes"
        onChange={onChange()}
      />
      <br />
      <br />
      <form name="examForm" onSubmit={next}>
        {exam?.questions?.length > 0 &&
          Object.entries(reusable).map(([key, value], index) => {
            return (
              <React.Fragment key={index}>
                <div>
                  <label htmlFor="">{key}: </label>
                  {key === "options" ? (
                    value.map((o, i) => {
                      return (
                        <React.Fragment key={i}>
                          <FormControlLabel
                            disabled={!o.length > 0}
                            control={<Radio checked={reusable.answer === o} />}
                            name="answer"
                            value={o}
                            onChange={onChange(i)}
                            required
                          />
                          <input
                            name="options"
                            value={o}
                            onChange={onChange(i)}
                            required
                          />
                          <br />
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <input
                      name={key}
                      value={value}
                      onChange={onChange()}
                      readOnly={key === "answer"}
                      required
                    />
                  )}
                </div>
                <br />
              </React.Fragment>
            );
          })}
        <div>
          <input
            type="submit"
            value={button}
            disabled={exam.activeIndex >= 15}
          />
        </div>
      </form>
      <button disabled={exam.activeIndex === 0} onClick={previous}>
        previous
      </button>
      <br />
      <br />
      <button disabled={exam.activeIndex != 15} onClick={submit}>
        submit
      </button>
    </div>
  );
}

export default ExamNew;
