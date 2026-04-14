import React, { useContext } from "react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import AppContext from "../Context/context";
import "./Footer.css";

const Footer = () => {
    const { user, logOut } = useContext(AppContext);

    return (
        <div className="App-footer">
            <p>
                Copyright {getCurrentYear()} - {getFooterCopy(true)}
            </p>
            {user.isLoggedIn && (
                <p>
                    Welcome {user.email} (
                    <a href="#logout" onClick={logOut}>
                        logout
                    </a>
                    )
                </p>
            )}
        </div>
    );
};

export default Footer;
