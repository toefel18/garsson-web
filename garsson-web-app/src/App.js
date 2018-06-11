import React, {Component} from 'react';
import './App.css';
import Auth from "./components/auth/Auth";
import Nav from "./components/nav/Nav";
import Bar from "./components/bar/Bar";
import NewOrder from "./components/order/NewOrder";
import axios from "axios";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import jwtDecode from "jwt-decode";

class App extends Component {

    state = {
        apiBaseUrl: "",
        configError: "",
        user: undefined,
    };

    componentWillMount() {
        axios.get("/config.json")
            .then(response => {
                console.log("using api base url: " + response.data.apiBaseUrl);
                this.setState({apiBaseUrl: response.data.apiBaseUrl});
            })
            .catch(error => {
                console.log("Error retrieving config", error);
                this.setState({configError: error.message});
            });
        this.processJwtIfPresent();
    }

    onLogout = () => {
        localStorage.removeItem("jwt");
        this.setState({user: undefined});
    };

    onLogin = () => {
        this.processJwtIfPresent()
    };

    processJwtIfPresent = () => {
        let jwt = localStorage.getItem("jwt");
        if (jwt) {
            console.log("jwt found, decoding");
            let parsedJwt = jwtDecode(jwt);
            let user = this.extractUser(parsedJwt);
            if (user.expires < new Date()) {
                console.log("jwt expired at " + user.expires);
                this.onLogout()
            } else {
                let millisTillExpire = user.expires - new Date();
                setTimeout(() => {
                    alert("logging out, session expired");
                    this.onLogout()
                }, millisTillExpire);
                this.setState({user: user});
            }
        } else {
            console.log("no jwt found, resetting login");
            this.onLogout()
        }
    };

    extractUser = (parsedJwt) => {
        return {
            email: parsedJwt.sub,
            roles: parsedJwt.roles,
            expires: new Date(parsedJwt.exp * 1000)
        }
    };

    render() {
        let content;

        if (this.state.configError) {
            content = this.renderError()
        } else {
            content = this.renderPage();
        }

        return (
            <div className="App">
                <Router>
                    <div>
                        <Nav
                            onLogout={this.onLogout}
                            user={this.state.user}
                        />
                        {content}
                    </div>
                </Router>
            </div>
        );
    }

    renderPage = () => {
        return (
            <div>
                <Route exact path="/" render={
                    () => (<Redirect to="/bar"/>)
                }/>
                <Route path="/login" render={
                    (route) => {
                        return (
                            <Auth
                                apiBaseUrl={this.state.apiBaseUrl}
                                onLogin={this.onLogin}
                                onLogout={this.onLogout}
                                user={this.state.user}
                            />
                        )
                    }}/>
                <Route path="/bar" render={
                    (route) => {
                        return (
                            this.state.user
                                ? <Bar/>
                                : <Redirect to="/login"/>
                        )
                    }
                }/>
                <Route path="/order" render={
                    (route) => {
                        return (
                            this.state.user
                                ? <NewOrder/>
                                : <Redirect to="/login"/>
                        )
                    }
                }/>
            </div>
        )
    };

    renderError = () => {
        return (
            <div className="alert alert-danger" role="alert">Could not correctly load
                configuration: {this.state.error}</div>
        )
    };
}

export default App;
