import React from "react";
import "./Nav.css";
import {Link} from 'react-router-dom';

export default class Nav extends React.Component {

    renderLogout = () => {
        if (this.props.user) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">{this.props.user.email}</Link>
                    </li>

                    <li className="nav-item">
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="button"
                                onClick={() => this.props.onLogout()}>Logout
                        </button>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link style={{display: 'block', height: '100%'}} to="/login">
                            <button className="btn btn-outline-success my-2 my-sm-0">
                                 Login
                            </button>
                        </Link>
                    </li>
                </ul>
            )
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <span className="navbar-brand">Garsson</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/bar">Bar</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/order">Order</Link>
                        </li>
                        {/*<li className="nav-item dropdown">*/}
                        {/*<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                        {/*data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                        {/*Dropdown*/}
                        {/*</a>*/}
                        {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                        {/*<a className="dropdown-item" href="#">Action</a>*/}
                        {/*<a className="dropdown-item" href="#">Another action</a>*/}
                        {/*<div className="dropdown-divider"></div>*/}
                        {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                        {/*</div>*/}
                        {/*</li>*/}

                    </ul>

                    {this.renderLogout()}


                    {/*<form className="form-inline my-2 my-lg-0">*/}
                    {/*/!*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />*!/*/}
                    {/**/}
                    {/*</form>*/}
                </div>
            </nav>
        )
    }
}