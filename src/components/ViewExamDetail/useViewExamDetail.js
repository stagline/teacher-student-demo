import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";

function useViewExamDetail() {
  const _id = useParams();
  const [id, setId] = useState(_id);
  for (var value of Object.values(id)) {
    console.log(value);
  }
  console.log("outside", value);
  const { config } = useContext(DataContext);

  const [viewExamDetail, setViewExamDetail] = useState();

  useEffect(() => {
    axios
      .get(
        `https://nodejsexamination.herokuapp.com/dashboard/Teachers/examDetail?id=${value}`,
        config
      )
      .then((response) => {
        console.log("ViewExamDetail>>>", response);
        setViewExamDetail(response);
      });
  }, []);

  const viewExamData = viewExamDetail?.data?.data?.questions;

  return [{ viewExamData }];
}

export default useViewExamDetail;
