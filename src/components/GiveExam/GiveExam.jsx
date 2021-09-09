import React, { useEffect, useState } from "react";
import useGiveExam from "./useGiveExam";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function GiveExam() {
  const [{ submit, data }] = useGiveExam();

  const [seconds, setSeconds] = React.useState(10);

  // React.useEffect(() => {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds("BOOOOM!");
  //   }
  // });

  const selectOption = (event, value) => {
    if (event.target.checked) {
      // here the radio is checked and value contains the option's value
      console.log(event.target.value);
    }
  };

  let questions = [
    {
      ques: "1. Who has won the Ballon d'Or most no of times",
      options: ["Neymar", "Ronaldo", "Lionel Messi", "Suarez"],
      correctIndex: 2,
    },
    {
      ques: "2. Who has won the Cricket World Cup most no of times",
      options: ["West Indies", "Australia", "New Zealand", "India"],
      correctIndex: 1,
    },
    {
      ques: "3. The West Indies hit 421 batting first in their warm up match versus who?",
      options: ["New Zealand", "India", "Pakistan", "Australia"],
      correctIndex: 0,
    },
    {
      ques: "4. Which among the following is/are true regarding the ratio of the national flag?",
      options: [
        "The ratio of the length to the height of the flag shall be 3:2",
        "The ratio of the length to the width of the flag shall be 3:2",
        "The ratio of the length to the height of the flag shall be 2:3",
        "Both (a) and (b)",
      ],
      correctIndex: 3,
    },
    {
      ques: "5. When the Jallianwala Bagh Massacre took place?",
      options: [
        "10 April, 1917",
        "13 April, 1918",
        "9 April, 1916",
        "13 April, 1919",
      ],
      correctIndex: 3,
    },
  ];
  let index = 0;
  let score = 0;
  const nextQues = () => {
    if (index > questions.length - 1) {
      gameOver();
      return;
    } else {
      let question = document.getElementById("questions");
      question.innerText = questions[index].ques;
      for (let i = 0; i < 4; i++) {
        let option = document.getElementById("option-" + (i + 1));
        option.innerText = questions[index].options[i];
        option.className = "blue-bg";
        if (questions[index].correctIndex === i) {
          option.onclick = (e) => {
            e.target.className = "right";
            score++;
            e.target.onclick = null;
          };
        } else {
          option.onclick = (e) => {
            e.target.classList.remove("blue-bg");
          };
        }
      }
      index++;
      setTimeout(nextQues, 10000);
    }
  };
  nextQues();
  function gameOver() {
    document.getElementById("gameOver").classList.remove("hidden");
    document.querySelector(".timer").style.animation = "none";
    document.querySelector(".timer").style["background-color"] = "gray";
    document.getElementById("final-score").innerText = score;
  }

  return (
    <div>
      <div class="questions">
        <h2>Football Quiz</h2>
        <p id="question"></p>
        <ul>
          <li id="option-1" class="blue-bg"></li>
          <li id="option-2" class="blue-bg"></li>
          <li id="option-3" class="blue-bg"></li>
          <li id="option-4" class="blue-bg"></li>
        </ul>
      </div>
      <div class="timer"></div>
      <div id="gameOver" class="hidden">
        <h3>Quiz Over</h3>
        <p>
          Your score: <span id="final-score">0</span>
        </p>
      </div>

      {/* {!data
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
      <button onClick={submit}>Give Exam</button> */}
    </div>
  );
}

export default GiveExam;

// https://www.stechies.com/uncaught-typeerror-cannot-set-property-innerhtml-null/
