/* eslint-disable */
import React, { Component } from "react";
import logo from "../assets/holberton-logo.jpg";
import AppContext from "../Context/context";
import "./Header.css";

class Header extends Component {
    static contextType = AppContext;

    render() {
        const { user, logOut } = this.context;

        return (
            <>
                <div className="App-header">
                    <img src={logo} alt="holberton logo" />
                    <h1 style={{ color: "#e1003c" }}>School dashboard</h1>
                </div>

                {user.isLoggedIn && (
                    <div id="logoutSection">
                        Welcome {user.email} (
                        <a href="#logout" onClick={logOut}>
                            logout
                        </a>
                        )
                    </div>
                )}
            </>
        );
    }
}

export default Header;