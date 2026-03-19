/* eslint-disable */
import React, { Component } from "react";
import "./Login.css";
import WithLogging from "../HOC/WithLogging";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            email: "",
            password: "",
            enableSubmit: false,
        };

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    validateForm(email, password) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return (
            emailRegex.test(email) &&
            password.length >= 8
        );
    }

    handleChangeEmail(e) {
        const email = e.target.value;

        this.setState((prevState) => ({
            email,
            enableSubmit: this.validateForm(email, prevState.password),
        }));
    }

    handleChangePassword(e) {
        const password = e.target.value;

        this.setState((prevState) => ({
            password,
            enableSubmit: this.validateForm(prevState.email, password),
        }));
    }

    handleLoginSubmit(e) {
        e.preventDefault(); // prevent page reload

        this.setState({
            isLoggedIn: true,
        });
    }

    render() {
        const { email, password, enableSubmit } = this.state;

        return (
            <div className="App-body">
                <p>Login to access the full dashboard</p>

                <form onSubmit={this.handleLoginSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChangeEmail}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleChangePassword}
                    />

                    <input
                        type="submit"
                        value="OK"
                        disabled={!enableSubmit}
                    />
                </form>
            </div>
        );
    }
}

export default WithLogging(Login);