import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./components/auth/Auth";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Garsson</h1>
        </header>
        <p className="App-intro">
          In development
        </p>
        <LoginForm />


      </div>
    );
  }
}

export default App;
