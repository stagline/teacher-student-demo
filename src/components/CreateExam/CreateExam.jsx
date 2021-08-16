import { getSuggestedQuery } from '@testing-library/react';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react'
import DataContext from '../../Contexts/DataContext';
import useCreateExam from './useCreateExam';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function CreateExam() {

    const [item, setItem] = useState([])

    const { config } = useContext(DataContext)

    const [exam, setExam] = useState({
        subjectName: "",
        questions: [
            {
                question: "",
                answer: "",
                options: ["", "", "", ""]
            }
        ], notes: [
            "",
            ""
        ]
    })

    const addItem = () => {
        setItem([...item, {
            question: "asd",
            answer: "asd",
            options: ["asd", "asd", "asd", "asd"]
        }])
        exam?.questions?.push(item)
        setExam({ ...exam })
        console.log(exam)
    };


    const [state, setState] = useState({
        data: {
            subjectName: "",
            questions: [{ question: "questionq", answer: "answer", options: ["sdf", "sdf", "sdf", "sdf"] }],
            "notes": [
                "10mins exam",
                "start time 10am"
            ]
        }
    })

    const jjj = (e) => {
        e.preventDefault()
        setState(prevState => ({
            data: { ...prevState.data, questions: [...prevState.data.questions, { question: e.target.value, answer: e.target.value, options: ["an1", "ans3", "ans2", "ans3"] }] }
        }))
        console.log(state?.data)
    }

    const handleChangee = (event) => {
        setValue(event.target.value);
        console.log(value)
    };

    const onSubmit = (e) => {
        debugger
        e.preventDefault();
        axios.post("https://nodejsexamination.herokuapp.com/dashboard/Teachers/Exam", exam, config)
            .then(response => {
                setExam({ response })
                alert("Exam Created Successfully!")
                console.log(response)
            })
        console.log(exam)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(state)
    }

    const handleChange = e => {
        // setState({ ...state, [e.target.name]: e.target.value })
        setState([...state, { [e.target.name]: e.target.value }])
    }

    const usePreviousValue = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const [value, setValue] = useState("")
    const prevValue = usePreviousValue(value)

    return (
        <div>
            <button onClick={addItem} >Add</button>
            <h1>Create Exam</h1>
            {JSON.stringify(exam)}
            <br /><br />
            <form action="" onSubmit={onSubmit}  >
                <label htmlFor="">Subject Name :</label>
                <select onChange={(e) => setExam((prevState) => {
                    exam.subjectName = e.target.value;
                    console.log(prevState)
                    return ({
                        ...prevState
                    })
                }
                )} >
                    <option value="React 0000">React 0000</option>
                    <option value="React 1000">React 1000</option>
                    <option value="React 2000">React 2000</option>
                    <option value="React 3000">React 3000</option>
                </select>
                <br /><br />
                <label htmlFor="">Questions :</label>
                <input type="text" name="question" onChange={(e) => setExam((prevState) => {
                    exam.questions[0].question = e.target.value;
                    console.log(prevState)
                    return ({
                        ...prevState
                    })
                }
                )} />
                <br /><br />
                <label htmlFor="">Aswer : </label>
                <input type="text" name="answer" onChange={(e) => setExam((prevState) => {
                    exam.questions[0].answer = e.target.value;
                    console.log(prevState)
                    return ({
                        ...prevState
                    })
                }
                )} />
                <br /><br />
                {/* <label htmlFor="">Options :</label> */}
                {/* <>
                    <div>
                        option 1 : <input type="radio" name="option1" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[0] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                    <div>
                        option 2 :  <input type="radio" name="option2" />
                    </div>
                    <div>
                        option 3 :  <input type="radio" name="option3" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[2] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                    <div>
                        option 4 :  <input type="radio" name="option4" onChange={(e) => setExam((prevState) => {
                            exam.questions[0].options[3] = e.target.value;
                            console.log(prevState)
                            return ({
                                ...prevState
                            })
                        }
                        )} />
                    </div>
                </> */}
                {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Options</FormLabel>
                    <RadioGroup  value={value} onChange={handleChangee}>
                        <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="Option 3" control={<Radio />} label="Option 3" />
                        <FormControlLabel value="Option 4" control={<Radio />} label="Option 4" />
                    </RadioGroup>
                </FormControl> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Options</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangee}>
                        <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="Option 3" control={<Radio />} label="Option 3" />
                        <FormControlLabel value="Option 4" control={<Radio />} label="Option 4" />
                    </RadioGroup>
                </FormControl>
                <br /><br />
                {JSON.stringify(value)}
                <br /><br />
                <input style={{ marginRight: "10px" }} className="btn btn-primary" type="button" value="Previous Question" />
                <input className="btn btn-primary" type="button" value="Next Question" /><br /><br />
                <input className="btn btn-primary" type="submit" value="Submit Exam" />
            </form>
        </div>
    )
}

export default CreateExam
