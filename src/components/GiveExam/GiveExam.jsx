import React from "react";
import useGiveExam from "./useGiveExam";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function GiveExam() {
  const [{ submit, data, handleChange }] = useGiveExam();

  return (
    <div>
      <h1>Give Exam</h1>
      {!data
        ? "Loading..."
        : data?.response?.data?.data?.map((item, index) => (
            <>
              <div>
                <h3>ID - {item._id} </h3>
                <h4>{item.question}</h4>
              </div>
              <div>
                <h3>Options</h3>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <FormControlLabel
                      control={<Radio />}
                      value={item.options[0]}
                      onChange={handleChange}
                    />
                    {item.options[0]}
                  </li>
                  <li>
                    <FormControlLabel
                      control={<Radio />}
                      value={item.options[1]}
                      onChange={handleChange}
                    />
                    {item.options[1]}
                  </li>
                  <li>
                    <FormControlLabel
                      control={<Radio />}
                      value={item.options[2]}
                      onChange={handleChange}
                    />
                    {item.options[2]}
                  </li>
                  <li>
                    <FormControlLabel
                      control={<Radio />}
                      value={item.options[3]}
                      onChange={handleChange}
                    />
                    {item.options[3]}
                  </li>
                </ul>
                <div>
                  <label>Answer : </label>
                  <input type="text" />
                </div>
              </div>
            </>
          ))}
      <br />
      <br />
      <button onClick={submit}>Give Exam</button>
    </div>
  );
}

export default GiveExam;
