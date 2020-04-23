import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import './stylesheets/global.css';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      courses: null,
    };

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            courses: result
          });
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <hr></hr>
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
