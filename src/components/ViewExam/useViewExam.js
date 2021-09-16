import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../Contexts/DataContext";
import { useParams } from "react-router-dom";

function useViewExam() {
  const { config } = useContext(DataContext);

  const { _id } = useParams();

  const [viewExam, setViewExam] = useState();
  const [name, setName] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axios
      .get(
        "https://nodejsexamination.herokuapp.com/dashboard/Teachers/viewExam",
        config
      )
      .then((response) => {
        if (response.data.statusCode !== 200) {
          alert(response.data.message);
          return;
        } else {
          console.log("ViewExam>>>", response);
          setViewExam({ response });
        }
      });
  }, []);

  const viewExamData = viewExam?.response?.data?.data;
  // console.log(viewExamData.map(u => u._id).filter((list) => list._id  === _id))

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://nodejsexamination.herokuapp.com/dashboard/Teachers/editExam?id=${_id}`,
        { subjectName: name.subjectName },
        config
      )
      .then((response) => {
        console.log("EditExam>>>", response);
      });
    console.log("Success Edit");
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault(e);
    // axios
    //   .delete(
    //     `https://nodejsexamination.herokuapp.com/dashboard/Teachers/deleteExam?id=${_id}`,
    //     config
    //   )
    //   .then((response) => {
    //     console.log("DelteExam>>>", response);
    //   });
    console.log(_id);
    console.log("Success Delete");
  };

  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return [
    {
      viewExamData,
      toggleModal,
      isOpen,
      handleChange,
      handleSubmit,
      handleDeleteSubmit,
      modal,
      toggle,
    },
  ];
}

export default useViewExam;
