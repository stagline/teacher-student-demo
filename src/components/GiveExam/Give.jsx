import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Give() {
  const { config } = useContext(DataContext);

  const { _id } = useParams();
  const history = useHistory();

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://nodejsexamination.herokuapp.com/student/examPaper?id=${_id}`,
        config
      )
      .then((response) => {
        if (response.data.statusCode === 500) {
          alert(response.data.message);
          history.push("/student");
          return;
        } else {
          setData({ response });
        }
      });
  }, []);

  console.log(data);

  return <div></div>;
}

export default Give;
