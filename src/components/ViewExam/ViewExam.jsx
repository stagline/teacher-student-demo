import React, { useState } from "react";
import useViewExam from "./useViewExam";
// import Modal from "react-modal"
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ViewExam(props) {
  console.log(props);
  const { className } = props;

  const [
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
  ] = useViewExam();

  return (
    <div>
      <Link to={`/teacher`}>
        <Button>Go to Teacher Dashboard</Button>
      </Link>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>Are You Sure?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteSubmit}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
      <h1>View Exam </h1>
      {!viewExamData ? null : (
        <div>
          {viewExamData?.map((u) => (
            <table className="table table-success table-striped" key={u._id}>
              <thead>
                <tr>
                  <th scope="col">ID:</th>
                  <th scope="col">Subject Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edit Exam</th>
                  <th scope="col">Delete Exam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={`/view-exam-detail/${u._id}`}>{u._id}</Link>
                  </td>
                  <td>{u.subjectName}</td>
                  <td>{u.email}</td>
                  <td id="edit" onClick={toggleModal}>
                    <Link to={`/view-exam/${u._id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </td>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                  >
                    <form onChange={handleChange} onSubmit={handleSubmit}>
                      <input type="text" name="subjectName" />
                      <input type="submit" value="Edit" />
                    </form>
                    <button onClick={toggleModal}>Close modal</button>
                  </Modal>
                  <td>
                    <Link to={`/view-exam/${u._id}`}>
                      <Button color="danger" onClick={toggle}>
                        Delete
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewExam;
