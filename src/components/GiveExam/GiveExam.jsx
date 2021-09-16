import React from "react";
import useGiveExam from "./useGiveExam";

function GiveExam() {
  const [{ question, data, seconds, submit, handleOptionChange }] =
    useGiveExam();

  return (
    <div>
      <React.Fragment>
        <h3></h3>
        <b>
          {question === 7 ? null : <p>Question Number : {question + 1}</p>}
          <br />
          <p>{data[question]?.question}</p>
          {/* {!question ? (
            "Loading..."
          ) : ( */}
          <>
            {!data.length > 0 ? null : (
              <div>
                {question < 7 ? (
                  <div>You Have Time Left : {seconds}</div>
                ) : (
                  <button onClick={submit}>Submi</button>
                )}
              </div>
            )}
          </>
          {/* )} */}
        </b>
        <div>
          {/* {console.log(value.options)} */}
          {data[question]?.options?.map((o, i) => {
            // console.log(`key2 value`, o, i);
            return (
              <React.Fragment key={i}>
                <div>
                  <input
                    type="radio"
                    name="options"
                    value={o}
                    //   checked={exam[i]?.answer === o}
                    onChange={(e) =>
                      handleOptionChange(
                        e.target.value,
                        data[question]?.question,
                        data[question]?._id
                      )
                    }
                  />
                  {/* {console.log("ooooo", typeof o)} */}
                  <input name="options" value={o} />
                  <br />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </React.Fragment>
      <br />
    </div>
  );
}

export default GiveExam;
