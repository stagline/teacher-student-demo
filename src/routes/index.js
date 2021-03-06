import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Navbar from "../components//Navbar/Navbar";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Student from "../components/StudentDashboard/Student";
import Teacher from "../components/TeacherDashboard/Teacher";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import VerifiedStudent from "../components/VerifiedStudent/VerifiedStudent";
import AllStudentData from "../components/AllStudents/AllStudentData";
import GetStudentDetail from "../components/GetStudentDetail/GetStudentDetail";
import UpdateStudent from "../components/UpdateStudent/UpdateStudent";
import AllExamForStudent from "../components/AllExam/AllExamForStudent";
import ExamPaper from "../components/ExamPaper/ExamPaper";
import StudentNew from "../components/StudentNew";
import Explore from "../components/Explore";
import ViewExam from "../components/ViewExam/ViewExam";
import ViewExamDetail from "../components/ViewExamDetail/ViewExamDetail";
import ViewStudentsDetail from "../components/ViewStudentsDetail/ViewStudentsDetail";
import axios from "axios";
import DataContext from "../Contexts/DataContext";
import ExamNew from "../components/CreateExam/ExamNew";
import GiveExam from "../components/GiveExam/GiveExam";
import ViewStudentDetailsTeacher from "../components/ViewStudentDetailsTeacher/ViewStudentDetailsTeacher";

function Index() {
  const data = [
    {
      id: 1,
      name: "Hong Kong Disneyland",
      category: "Entertainment",
    },
    {
      id: 2,
      name: "Repulse Bay and the Beaches",
      category: "Outdoor",
    },
    {
      id: 3,
      name: "Star Ferry Pier/Victoria Harbour",
      category: "Attraction",
    },
  ];

  const { config } = useContext(DataContext);

  const [viewExam, setViewExam] = useState();

  useEffect(() => {
    axios
      .get(
        "https://nodejsexamination.herokuapp.com/dashboard/Teachers/viewExam",
        config
      )
      .then((response) => {
        // console.log("From App ViewExam>>>", response);
        setViewExam({ response });
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          {/* <ProtectedRoute exact path="/student" component={Student} /> */}
          <ProtectedRoute exact path="/teacher" component={Teacher} />
          <ProtectedRoute
            exact
            path={`/students-data`}
            component={AllStudentData}
          />
          <ProtectedRoute
            exact
            path={`/student-update`}
            component={UpdateStudent}
          />
          <ProtectedRoute
            exact
            path="/student-detail"
            component={GetStudentDetail}
          />
          {/* <ProtectedRoute exact path="/exam-paper" component={ExamPaper} /> */}
          <ProtectedRoute
            exact
            path="/all-exam"
            component={AllExamForStudent}
          />
          <ProtectedRoute
            exact
            path="/verified-student"
            component={VerifiedStudent}
          />

          <ProtectedRoute
            exact
            path="/view-students-detail"
            component={ViewStudentsDetail}
          />
          <ProtectedRoute exact path="/create-exam" component={ExamNew} />
          <ProtectedRoute exact path="/student" component={Student} />
          <ProtectedRoute exact path="/student/:_id" component={ExamPaper} />
          <ProtectedRoute exact path="/give-exam/:_id" component={GiveExam} />
          <Route exact path="/explore">
            <Explore data={data} />
          </Route>
          <Route exact path="/explore/:name">
            <StudentNew data={data} />
          </Route>
          <Route exact path="/view-exam/:_id">
            <ViewExam />
          </Route>
          <Route exact path="/view-exam-detail/:_id" component={ViewExamDetail}>
            <ViewExamDetail />
          </Route>
          <Route
            exact
            path="/view-student-details/:_id"
            component={ViewStudentDetailsTeacher}
          >
            <ViewStudentDetailsTeacher />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const token = localStorage.getItem("token");
  // console.log("this", token);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default Index;
