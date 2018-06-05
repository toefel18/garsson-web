import React from "react";
import "./Auth.css";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        isLoggedIn: false,
        loggedInAs: "",
        expires: "",
        roles: [],
        loginError: ""
    };

    componentWillMount() {
        this.processJwtIfPresent()
    }

    processJwtIfPresent = () => {
        let jwt = localStorage.getItem("jwt");
        if (jwt) {
            console.log("jwt found, decoding");
            let parsedJwt = jwtDecode(jwt);
            this.setState({
                loggedInAs: parsedJwt.sub,
                expires: new Date(parsedJwt.exp * 1000),
                roles: parsedJwt.roles,
                isLoggedIn: true
            })
        } else {
            console.log("no jwt found, resetting login");
            this.resetLogin()
        }
    };

    render() {
        if (this.state.isLoggedIn) {
            return this.renderLogout()
        } else {
            return this.renderLogin()
        }
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.resetLogin();
        this.setState({loginError: ""});
        axios.post("http://localhost:8080/api/v1/login", {email: this.state.username, password: this.state.password})
            .then(response => this.doLogin(response))
            .catch(error => {
                console.log(error);
                this.setState({loginError: error.message})
            });
    };

    doLogin = (response) => {
        console.log(response);
        let jwt = response.headers["authorization"].substring("Bearer ".length);
        if (jwt == null || jwt.length < 1) {
            this.setState({loginError: "received invalid or missing JWT from server"})
        } else {
            this.setState({password: ""})
        }
        localStorage.setItem("jwt", jwt);
        this.processJwtIfPresent();
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.resetLogin()
    };

    resetLogin = () => {
        localStorage.removeItem("jwt");
        this.setState({
            isLoggedIn: false,
            loggedInAs: "",
            expires: "",
            roles: []
        })
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

                        autoFocus />
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
                            {this.state.loggedInAs} (roles: {this.state.roles.join(", ")}) session expires at {moment(this.state.expires).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <button className="btn btn-warning" type="submit">Logout</button>
                    </div>
                </form>
            </div>
        );
    }
}
