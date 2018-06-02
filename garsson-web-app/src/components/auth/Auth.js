import React from "react";
import "./Auth.css";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        loginError: "",
        isLoggedIn: false,
        loggedInAs: "",
        expires: "",
        roles: []
    };

    componentWillMount() {
        this.processJwtIfPresent()
    }

    processJwtIfPresent = () => {
        let jwt = localStorage.getItem("jwt");
        if (jwt) {
            let parsedJwt = jwtDecode(jwt);
            this.setState({
                loggedInAs: parsedJwt.sub,
                expires: new Date(parsedJwt.exp * 1000),
                roles: jwt.roles
            })
        } else {
            this.setState({
                loggedInAs: "",
                expires: "",
                roles: []
            })
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
        axios.post("http://localhost:8080/api/v1/login", {email: this.state.username, password: this.state.password})
            .then(response => this.doLogin(response))
            .catch(error => {
                console.log(error);
                this.setState({loginError: error.message})
            });
    };

    doLogin = (response) => {
        console.log(response);
        let jwt = response.headers["Authorization"].substring("Bearer ".length);
        if (jwt == null || jwt.length < 1) {
            this.setState({loginError: "received invalid or missing JWT from server"})
        }
        localStorage.setItem("jwt", jwt);
        this.processJwtIfPresent();
    };

    handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("jwt");
    };

    renderLogin() {
        return (
            <div className="div-table">
                <form onSubmit={this.handleLogin}>
                    <div className="div-table-row">
                        <div className="div-table-col">Username</div>
                        <div className="div-table-col">
                            <input type="text"
                                   id="auth-login-username"
                                   value={this.state.username}
                                   onChange={(event) => this.setState({username: event.target.value})}
                                   placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="div-table-row">
                        <div className="div-table-col">Password</div>
                        <div className="div-table-col">
                            <input type="password"
                                   id="auth-login-password"
                                   value={this.state.password}
                                   onChange={(event) => this.setState({password: event.target.value})}
                            />
                        </div>
                    </div>
                    <div className="div-table-row pull-right">
                        <button className="login-button" id="auth-login-submit" type="submit">Login</button>
                    </div>
                    <div className="div-table-row login-error">
                        <span>{this.state.loginError}</span>
                    </div>
                </form>
            </div>
        );
    }

    renderLogout() {
        return (
            <div className="div-table">
                <form onSubmit={this.handleLogout}>
                    <div className="div-table-row">
                        <span className="logout-text">
                            {this.props.loggedInAs}, session expires at {moment(this.props.expiresAt).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <button className="logout-button" type="submit">Logout</button>
                    </div>
                </form>
            </div>
        );
    }
}
