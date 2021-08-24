import React from "react";
import { useForm } from "react-hook-form";

function UseForm() {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {indexes.map((index) => {
          const fieldName = `friends[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <label>
                First Name {index}:
                <input
                  type="text"
                  name={`${fieldName}.firstName`}
                  {...register("test", { required: true })}
                />
              </label>

              <label>
                Last Name {index}:
                <input
                  type="text"
                  name={`${fieldName}.lastName`}
                  {...register("test", { required: true })}
                />
              </label>
            </fieldset>
          );
        })}

        <button type="button" onClick={addFriend}>
          Add Friend
        </button>

        <input type="submit" />
      </form>
    </div>
  );
}

export default UseForm;
