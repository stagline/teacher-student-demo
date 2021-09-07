import React, { useContext, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import DataContext from "../../Contexts/DataContext";

function Exam() {
  const { config } = useContext(DataContext);
  const examData = {
    subjectName: "",
    notes: "",
    question: "",
    answer: "",
    option1: "", 
    option2: "",
    option3: "",
    option4: "",
  };

  const [exam, setExam] = useState(examData);

  const [index, setIndex] = useState([]);

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setExam({ ...exam, [name]: value });
  };

  const nextQuestion = (e) => {
    const examQuestionValues = exam?.question;
    console.log(examQuestionValues);
    let options = [exam.option1, exam.option2, exam.option3, exam.option4];
    let optionsWithNoDuplicates = Object.keys(
      options.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    );
    console.log(optionsWithNoDuplicates);
    const newQuestion = {
      question: exam.question,
      answer: exam.answer,
      options: optionsWithNoDuplicates,
    };
    let array = [];
    array.push(...array, {
      subjectName: exam.subjectName,
      notes: exam.notes,
      questions: [
        {
          question: exam.question,
          answer: exam.answer,
          options: [exam.option1, exam.option2, exam.option3, exam.option4],
        },
      ],
    });
    localStorage.setItem("exam", JSON.stringify(array));
    console.log(array);

    setIndex([array, array]);
    console.log(index);
  };

  return (
    <div>
      <form name="examForm">
        <div>
          <div>
            <label htmlFor="">Subject Name :</label>
            <select
              name="subjectName"
              value={exam.subjectName}
              onChange={onChangeUser}
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
              type="text"
              name="notes"
              value={exam.notes}
              onChange={onChangeUser}
            />
          </div>
          <label>Question</label>
          <input
            type="text"
            type="text"
            name="question"
            value={exam.question}
            onChange={onChangeUser}
          />
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            type="text"
            name="answers"
            value={exam.answer}
            onChange={onChangeUser}
          />
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup>
              <div>
                <FormControlLabel
                  control={<Radio />}
                  type="radio"
                  name="answer"
                  value={exam.option1}
                  onChange={onChangeUser}
                  checked={exam.option1 == exam.answer}
                />{" "}
                <input
                  type="text"
                  name="option1"
                  type="text"
                  name="option1"
                  value={exam.option1}
                  onChange={onChangeUser}
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  control={<Radio />}
                  type="radio"
                  name="answer"
                  value={exam.option2}
                  onChange={onChangeUser}
                  checked={exam.option2 == exam.answer}
                />{" "}
                <input
                  type="text"
                  name="option2"
                  type="text"
                  value={exam.option2}
                  onChange={onChangeUser}
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  control={<Radio />}
                  type="radio"
                  name="answer"
                  value={exam.option3}
                  onChange={onChangeUser}
                  checked={exam.option3 == exam.answer}
                />{" "}
                <input
                  type="text"
                  name="option3"
                  type="text"
                  value={exam.option3}
                  onChange={onChangeUser}
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                  control={<Radio />}
                  type="radio"
                  name="answer"
                  value={exam.option4}
                  onChange={onChangeUser}
                  checked={exam.option4 == exam.answer}
                />{" "}
                <input
                  type="text"
                  name="option4"
                  type="text"
                  value={exam.option4}
                  onChange={onChangeUser}
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
          value="Previous Question"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          type="button"
          value="reset"
          style={{ marginRight: "10px" }}
        />
        <input
          className="btn btn-primary"
          type="submit"
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
    </div>
  );
}

export default Exam;
