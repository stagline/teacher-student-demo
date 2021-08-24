import React,{useState,useEffect} from 'react'
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Fragment } from 'react';

const ExamCreator = () =>  {

    
    const [index, setIndex] = useState(1);

    const [examCreateState, setExamCreateState] = useState({
      subject_name: "", 
      question: "", 
      note: "",
    })
    const [questionOption, setQuestionOption] = useState([
      {
        id:1,option:'',anwser:false
      },
      {
        id:2,option:'',anwser:false
      },
      {
        id:3,option:'',anwser:false
      },
      {
        id:4,option:'',anwser:false
      },
  ])
  const [rightAnswer, setRightAnswer] = useState(null)


  const [questionState, setQuestionState] = useState([])

  console.log("questionState",questionState);
  console.log("questionState",questionState);

  // console.log("questionOption",questionOption);

    // console.log("questionOption",questionOption);
    console.log("examCreateState",examCreateState);

    const handelInputChange = (e) => {
        const {name,value} = e.target
        setExamCreateState(_ => {
            return {
                ..._,
                [name]:value
            }
        })
    }

    const handelOptionChange = (e) => {
        const {value,id} = e.target
        setQuestionOption(_ => _.map((item) => {
            if(item.id === Number(id)){
                item.option = value
            }
            return item
        }))
    }


    const handleSelectOneOption = (e) => {
      // console.log("one option",e.target.value);
      setQuestionOption(_ => _.map((item) => {
        if(item.option === e.target.value){
            item.anwser = true
        }
        return item
      }))
      setRightAnswer(e.target.value)
    }

    const [prevQestionIndex, setPrevQestionIndex] = useState(0);
    const [nextQuestionIndex, setNextQuestionIndex] = useState(0);
  
    console.log("prevQestionIndex",prevQestionIndex);
    console.log("nextQuestionIndex",nextQuestionIndex);

    const PrevQuestion = (e,next) => {
      e.preventDefault()
      // setPrevQestionIndex(prevQestionIndex - 1);
      if(nextQuestionIndex > 1)
      {
        setPrevQestionIndex(() => { return prevQestionIndex - 1});
        if(prevQestionIndex <= nextQuestionIndex){
          setNextQuestionIndex(() => { return nextQuestionIndex - 1});
        }
      }
      setExamCreateState({
        subject_name: questionState[prevQestionIndex].subject_name, 
        question: questionState[prevQestionIndex].question, 
        note:questionState[prevQestionIndex].note,
      })
      setRightAnswer(questionState[prevQestionIndex].answer)
      setQuestionOption(questionState[prevQestionIndex].options)
    }


    const NextQuestion = () => {
      setQuestionState([
        ...questionState,
        {
          subject_name:examCreateState.subject_name,
          question:examCreateState.question,
          note:examCreateState.note,
          options:questionOption,
          answer:rightAnswer
        }
      ])
      setExamCreateState({
        subject_name: "", 
        question: "", 
        note: "",
      })
      setQuestionOption([
        {
          id:1,option:'',anwser:false
        },
        {
          id:2,option:'',anwser:false
        },
        {
          id:3,option:'',anwser:false
        },
        {
          id:4,option:'',anwser:false
        },
      ])
      setRightAnswer('')
      
      setNextQuestionIndex(() => { return nextQuestionIndex + 1});

      if(nextQuestionIndex >= 1){
        setPrevQestionIndex(() => { return prevQestionIndex + 1});
      }
     
      
    }

   

  

    
    
    return (
        <div>
            <h1>Create Exam</h1>
            <b>Question : - {index} </b>
        <br />
        <br />

        <form name="subject">
          <label htmlFor="">Subject Name :</label>
            <select name="subject_name" onChange={(e) => handelInputChange(e)} value={examCreateState?.subject_name}>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Data Structures">Data Structures</option>
                <option value="DSP">DSP</option>
                <option value="Data Communication">Data Communication</option>
                <option value="RTES">RTES</option>
            </select>
          <br />
          <br />

            <label htmlFor="">Notes :</label>
            <input name="note"  onChange={(e) => handelInputChange(e)} value={examCreateState?.note}/>
          <br />
          <br />

        </form>

        <form name="questions">
            <label htmlFor="">Question :</label>
            <input type="text" name="question" onChange={(e) => handelInputChange(e)} value={examCreateState?.question}/>
          <br />
          <br />

            <label htmlFor="">Answer :</label>
            <input type="text" name="answer" value={rightAnswer} readOnly  />
          <br />
          <br />

          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup 
                    // value={value} 
                    onChange={handleSelectOneOption}
            >
              <div>
                  
                  {questionOption.length && questionOption.map((_item,i) => {
                      return(
                            <Fragment>
                                <FormControlLabel 
                                  control={<Radio />} 
                                  disabled={!_item.option}
                                  value={_item.option}
                                  />
                                <input
                                    type="text"
                                    name={"option" + i}
                                    id={_item.id}
                                    onChange={(e) => handelOptionChange(e)}
                                    value={_item.option}
                                />
                                <br />
                            </Fragment>
                      )
                  })
                  }
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
              onClick={(e) => PrevQuestion(e,nextQuestionIndex)}
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
    )
}

export default ExamCreator
