import { useState } from "react";

function validateForm(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length >= 8;
}

function useLogin(onLogin, initialEmail = "", initialPassword = "") {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);
    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleChangeEmail = (e) => {
        const nextEmail = e.target.value;
        setEmail(nextEmail);
        setEnableSubmit(validateForm(nextEmail, password));
    };

    const handleChangePassword = (e) => {
        const nextPassword = e.target.value;
        setPassword(nextPassword);
        setEnableSubmit(validateForm(email, nextPassword));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (onLogin) {
            onLogin(email, password);
        }
    };

    return {
        email,
        password,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit,
    };
}

export default useLogin;
