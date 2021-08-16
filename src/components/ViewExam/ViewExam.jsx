import React from 'react'
import useViewExam from './useViewExam'
import Modal from "react-modal"
Modal.setAppElement("#root");

function ViewExam() {

    const [{ viewExamData, toggleModal, isOpen, handleChange, handleSubmit, handleDeleteSubmit }] = useViewExam()

    return (
        <div>
            <h1>View Exam </h1>
            {
                !viewExamData ? null : (<div>
                    {
                        viewExamData?.map(u => (
                            <table className="table table-success table-striped" key={u._id}>
                                <thead>
                                    <tr>
                                        <th scope="col" >Id</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Edit Exam</th>
                                        <th scope="col">Delete Exam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td > {u._id}</td>
                                        <td>{u.subjectName}</td>
                                        <td>{u.email}</td>
                                        <td onClick={toggleModal}>Edit</td>
                                        <Modal
                                            isOpen={isOpen}
                                            onRequestClose={toggleModal}
                                            contentLabel="My dialog"
                                        >
                                            <form onChange={handleChange} onSubmit={handleSubmit} >
                                                <input type="text" name="subjectName" />
                                                <input type="submit" value="Edit" />
                                            </form>
                                            <button onClick={toggleModal}>Close modal</button>
                                        </Modal>
                                        <td onClick={handleDeleteSubmit} >Delete</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default ViewExam
