import React from "react";
import "./Auth.css";
import moment from "moment";
import axios from "axios";

export default class Auth extends React.Component {
    state = {
        username: "",
        password: "",
        loginError: ""
    };

    render() {
        if (this.props.user) {
            return this.renderLogout()
        } else {
            return this.renderLogin()
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.setState({loginError: ""});

        axios.post(this.props.apiBaseUrl + "/v1/login", {email: this.state.username, password: this.state.password})
            .then(response => this.doLogin(response))
            .catch(error => {
                console.log(error);
                if (error.response && error.response.data.message) {
                    this.setState({loginError: error.response.data.message})
                } else {
                    this.setState({loginError: error.message})
                }
            });
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.props.onLogout()
    };

    doLogin = (response) => {
        console.log(response);
        let jwt = response.headers["authorization"].substring("Bearer ".length);
        if (jwt == null || jwt.length < 1) {
            this.setState({loginError: "received invalid or missing JWT from server"})
        } else {
            this.setState({password: ""}) // make sure this doesn't linger around
        }
        localStorage.setItem("jwt", jwt);
        this.props.onLogin();
    };

    renderLogin() {
        return (
            <div>
                <form className="form-signin" onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        value={this.state.username}
                        onChange={(event) => this.setState({username: event.target.value})}

                        autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <div className="div-table-row login-error">
                    <span>{this.state.loginError}</span>
                </div>
            </div>
        );
    }

    renderLogout() {
        return (
            <div className="div-table">
                <form onSubmit={this.handleLogout}>
                    <div className="div-table-row">
                        <span className="logout-text">
                            {this.props.user.email} (roles: {this.props.user.roles.join(", ")}) session expires at {moment(this.props.user.expires).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <button className="btn btn-warning" type="submit">Logout</button>
                    </div>
                </form>
            </div>
        );
    }
}
