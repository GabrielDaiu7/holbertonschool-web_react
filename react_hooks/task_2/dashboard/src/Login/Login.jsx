import React, { useState } from "react";
import "./Login.css";
import WithLogging from "../HOC/WithLogging";

function validateForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
}

function Login({ email = "", password = "", logIn }) {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({ email, password });

    const handleChangeEmail = (e) => {
        const { value: nextEmail } = e.target;
        const nextPassword = formData.password;

        setFormData({
            email: nextEmail,
            password: nextPassword,
        });
        setEnableSubmit(validateForm(nextEmail, nextPassword));
    };

    const handleChangePassword = (e) => {
        const { value: nextPassword } = e.target;
        const nextEmail = formData.email;

        setFormData({
            email: nextEmail,
            password: nextPassword,
        });
        setEnableSubmit(validateForm(nextEmail, nextPassword));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (logIn) {
            logIn(formData.email, formData.password);
        }
    };

    return (
        <div className="App-body">
            <p>Login to access the full dashboard</p>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeEmail}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChangePassword}
                />

                <input type="submit" value="OK" disabled={!enableSubmit} />
            </form>
        </div>
    );
}

export default WithLogging(Login);
