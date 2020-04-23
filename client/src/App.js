import React from 'react';
import logo from './logo.svg';
import './App.css';

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
    const {error, isLoaded, courses} = this.state;
    
    if(error) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Error: {error.message}
            </a>
          </header>
        </div>
      );
    } else if(!isLoaded) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loading...
            </a>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <ul>
          {courses.map( course => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
          </header>
        </div>
      );
    }

  }
}
