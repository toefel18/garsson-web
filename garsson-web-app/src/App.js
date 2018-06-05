import React, { Component } from 'react';
import './App.css';
import LoginForm from "./components/auth/Auth";

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Garsson</h1>
        </header>
        <LoginForm />


      </div>
    );
  }
}

export default App;
