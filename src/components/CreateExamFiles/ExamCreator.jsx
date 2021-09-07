import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Fragment } from "react";

const ExamCreator = () => {
  const [index, setIndex] = useState(1);

  const [exam, setExam] = useState({
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
      },
    ],
    notes: [],
  });

  console.log("question", exam.questions);

  console.log("exam", exam);
  const [examCreateState, setExamCreateState] = useState({
    subject_name: "",
    question: "",
    note: "",
  });
  const [questionOption, setQuestionOption] = useState([
    {
      id: 1,
      option: "",
      anwser: false,
    },
    {
      id: 2,
      option: "",
      anwser: false,
    },
    {
      id: 3,
      option: "",
      anwser: false,
    },
    {
      id: 4,
      option: "",
      anwser: false,
    },
  ]);
  const [rightAnswer, setRightAnswer] = useState(null);

  const [questionState, setQuestionState] = useState([]);

  console.log("questionState", questionState);
  console.log("questionState", questionState);

  // console.log("questionOption",questionOption);

  // console.log("questionOption",questionOption);
  console.log("examCreateState", examCreateState);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setExam((_) => {
      return {
        ..._,
        [name]: value,
      };
    });
  };

  const handelOptionChange = (e) => {
    const { value, id } = e.target;
    setQuestionOption((_) =>
      _.map((item) => {
        if (item.id === Number(id)) {
          item.option = value;
        }
        return item;
      })
    );
  };

  const handleSelectOneOption = (e) => {
    // console.log("one option",e.target.value);
    setQuestionOption((_) =>
      _.map((item) => {
        if (item.option === e.target.value) {
          item.anwser = true;
        }
        return item;
      })
    );
    setRightAnswer(e.target.value);
  };

  const [prevQestionIndex, setPrevQestionIndex] = useState(0);
  const [nextQuestionIndex, setNextQuestionIndex] = useState(0);

  console.log("prevQestionIndex", prevQestionIndex);
  console.log("nextQuestionIndex", nextQuestionIndex);

  const PrevQuestion = (e, next) => {
    e.preventDefault();
    // setPrevQestionIndex(prevQestionIndex - 1);
    if (nextQuestionIndex > 1) {
      setPrevQestionIndex(() => {
        return prevQestionIndex - 1;
      });
      if (prevQestionIndex <= nextQuestionIndex) {
        setNextQuestionIndex(() => {
          return nextQuestionIndex - 1;
        });
      }
    }
    setExamCreateState({
      subject_name: questionState[prevQestionIndex].subject_name,
      question: questionState[prevQestionIndex].question,
      note: questionState[prevQestionIndex].note,
    });
    setRightAnswer(questionState[prevQestionIndex].answer);
    setQuestionOption(questionState[prevQestionIndex].options);
  };

  const NextQuestion = () => {
    setQuestionState([
      ...questionState,
      {
        subject_name: examCreateState.subject_name,
        question: examCreateState.question,
        note: examCreateState.note,
        options: questionOption,
        answer: rightAnswer,
      },
    ]);
    setExamCreateState({
      subject_name: "",
      question: "",
      note: "",
    });
    setQuestionOption([
      {
        id: 1,
        option: "",
        anwser: false,
      },
      {
        id: 2,
        option: "",
        anwser: false,
      },
      {
        id: 3,
        option: "",
        anwser: false,
      },
      {
        id: 4,
        option: "",
        anwser: false,
      },
    ]);
    setRightAnswer("");

    setNextQuestionIndex(() => {
      return nextQuestionIndex + 1;
    });

    if (nextQuestionIndex >= 1) {
      setPrevQestionIndex(() => {
        return prevQestionIndex + 1;
      });
    }
  };

  // const handleNotesChange = (e)=> {
  //   // setExam(_=> _.notes?.map((__) => {

  //   //     __ = e.target.value
  //   //     return __

  //   // })
  //   setExam(oldArray => [...oldArray.notes, e.target.value]);
  //   // )

  // }

  const [items, setItems] = React.useState([
    {
      name: "",
      quantity: "",
      unit: "",
      options: [
        {
          id: 1,
          option: "",
          anwser: false,
        },
        {
          id: 2,
          option: "",
          anwser: false,
        },
        {
          id: 3,
          option: "",
          anwser: false,
        },
        {
          id: 4,
          option: "",
          anwser: false,
        },
      ],
    },
  ]);

  //   console.log("items", items);

  const updateItem = (prop, event, index) => {
    const old = exam.questions[index];
    const updated = { ...old, [prop]: event.target.value };
    const clone = [...exam.questions];
    clone[index] = updated;
    console.log("clone", clone);
    setExam({ ...exam, questions: clone });
  };

  return (
    <div>
      <h1>Create Exam</h1>
      <b>Question : - {index} </b>
      <br />
      <br />

      <form name="subject">
        <label htmlFor="">Subject Name :</label>
        <select
          name="subjectName"
          onChange={(e) => handelInputChange(e)}
          value={exam?.subjectName}
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
        //   value={exam?.notes}
        />
        <br />
        <br />

        {exam.questions?.map((item, i) => (
          <div key={i}>
            <input onChange={(e) => updateItem("question", e, i)} />
            {/* <br />
              <br /> */}

            <label htmlFor="">Answer :</label>
            <input onChange={(e) => updateItem("answer", e, i)} />
            {/* <br />
                <br /> */}
          </div>
        ))}
        
      </form>

      <form name="questions">
       

        <FormControl component="fieldset">
          <FormLabel component="legend">Options</FormLabel>
          <RadioGroup
            // value={value}
            onChange={handleSelectOneOption}
          >
            <div>
              {items.length &&
                items.map((_item, i) => {
                  _item.options.map((_, is) => {
                    return (
                      <Fragment>
                        <FormControlLabel
                          control={<Radio />}
                          disabled={!_.option}
                          value={_.option}
                        />
                        <input
                          type="text"
                          name={"option" + i}
                          id={_.id}
                          onChange={(e) => updateItem("options", e, is)}
                          value={_.option}
                        />
                        <br />
                      </Fragment>
                    );
                  });
                })}
              {/* <FormControlLabel
                //   disabled={!item[0].options[1]?.length > 0}
                //   value={item[0].options[1]}
                  control={<Radio />}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[1] = e.target.value;
                //       console.log(prevState[0].options[1]);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />{" "}
                <input
                  type="text"
                  name="option1"
                  onChange={(e) => handelInputChange(e)}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[1] = e.target.value;
                //       console.log(prevState);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />
                <br /> */}
            </div>
            {/* <div>
                <FormControlLabel
                //   disabled={!item[0].options[2]?.length > 0}
                //   value={item[0].options[2]}
                  control={<Radio />}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[2] = e.target.value;
                //       console.log(prevState[0].options[2]);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />{" "}
                <input
                  type="text"
                  name="option2"
                  onChange={(e) => handelInputChange(e)}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[2] = e.target.value;
                //       console.log(prevState);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />
                <br /> */}
            {/* </div>
              <div>
                <FormControlLabel
                //   disabled={!item[0].options[3]?.length > 0}
                //   value={item[0].options[3]}
                onChange={(e) => handelInputChange(e)}
                  control={<Radio />}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[3] = e.target.value;
                //       console.log(prevState[0].options[3]);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />{" "}
                <input
                  type="text"
                  name="option3"
                  onChange={(e) => handelInputChange(e)}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[3] = e.target.value;
                //       console.log(prevState);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />
                <br />
              </div>
              <div>
                <FormControlLabel
                //   disabled={!item[0].options[4]?.length > 0}
                //   value={item[0].options[4]}
                  control={<Radio />}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[4] = e.target.value;
                //       console.log(prevState[0].options[4]);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />{" "}
                <input
                  type="text"
                  name="option4"
                  onChange={(e) => handelInputChange(e)}
                //   onChange={(e) =>
                //     setItem((prevState) => {
                //       item[0].options[4] = e.target.value;
                //       console.log(prevState);
                //       return {
                //         ...prevState,
                //       };
                //     })
                //   }
                />
                <br /> */}
            {/* </div> */}
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <div style={{ display: "inline-flex", margin: "10px" }}>
          <input
            className="btn btn-primary"
            type="button"
            onClick={(e) => PrevQuestion(e, nextQuestionIndex)}
            value="Previous Question"
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="button"
            value="reset"
            //   onClick={reset}
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="submit"
            //   onClick={submitExam}
            value="Submit Exam"
            style={{ marginRight: "10px" }}
          />
          <input
            className="btn btn-primary"
            type="button"
            onClick={NextQuestion}
            value="Next Question"
          />
        </div>
      </form>
    </div>
  );
};

export default ExamCreator;



// var products_cart = [1, 2, 3, 4];
// var cart_details = [
//   {
//     product_id: 1,
//     value: "Option1",
//   },
//   {
//     product_id: 2,
//     value: "Option2",
//   },
//   {
//     product_id: 3,
//     value: "Option3",
//   },
//   {
//     product_id: 4,
//     value: "Option4",
//   },
// ];

// products_cart.forEach(function (id) {
//   cart_details.forEach(function (detail) {
//     if (detail.product_id === id) {
//       // console.log(detail);
//     }
//   });
// });

// var employeeData = [
//   [["Bob"], ["lastName", "Lob"], ["age", 22], ["role", "salesperson"]],
//   [
//     ["firstName", "Mary"],
//     ["lastName", "Joe"],
//     ["age", 32],
//     ["role", "director"],
//   ],
// ];

// function transformData(employeeData) {
//   let newObject = {};
//   let newArr = [];

//   for (var i = 0; i < employeeData.length; i++) {
//     for (var x = 0; x < employeeData[i].length; x++) {
//       for (var y = 0; y < employeeData[i][y].length; y++) {
//         newObject[employeeData[i][y][0]] = employeeData[i][y][1];
//       }
//     }
//     newArr.push(newObject);
//     newObject = {};
//   }
//   return newArr;
// }

// console.log(transformData(employeeData));