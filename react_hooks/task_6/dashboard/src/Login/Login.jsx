import React from "react";
import "./Login.css";
import WithLogging from "../HOC/WithLogging";
import useLogin from "../hooks/useLogin";

function Login({ email = "", password = "", logIn }) {
    const {
        email: currentEmail,
        password: currentPassword,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit,
    } = useLogin(logIn, email, password);

    return (
        <div className="App-body">
            <p>Login to access the full dashboard</p>

            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={currentEmail}
                    onChange={handleChangeEmail}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={currentPassword}
                    onChange={handleChangePassword}
                />

                <input type="submit" value="OK" disabled={!enableSubmit} />
            </form>
        </div>
    );
}

export default WithLogging(Login);
