import React, { useEffect, useState } from "react";
import useGiveExam from "./useGiveExam";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function GiveExam() {
  const [{ submit, data }] = useGiveExam();

  const [seconds, setSeconds] = React.useState(10);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  });

  const selectOption = (event, value) => {
    if (event.target.checked) {
      // here the radio is checked and value contains the option's value
      console.log(event.target.value);
    }
  };

  return (
    <div>
      {!data
        ? "Loading..."
        : data?.response?.data?.data?.length > 0 &&
          Object.entries(data?.response?.data?.data)?.map(
            ([key, value], index) => {
              return (
                <React.Fragment key={index}>
                  <b>
                    <p>{value.question}</p>
                  </b>
                  <div>
                    {console.log(value.options)}
                    {value?.options?.map((o, i) => {
                      console.log(`key2 value`, o, i);
                      return (
                        <React.Fragment key={i}>
                          <div>
                            <FormControlLabel
                              control={<Radio />}
                              name="options"
                              value={o}
                              onChange={(e) => selectOption(e, o)}
                            />
                            {console.log(o)}
                            <input name="options" value={o} />
                            <br />
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            }
          )}
      <br />
      <div>{seconds}</div>
      <button onClick={submit}>Give Exam</button>
    </div>
  );
}

export default GiveExam;
