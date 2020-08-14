import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import { signout } from "../../../services/auth/auth";
import notify from "../../../services/toast/Toast"

const LogoutComponent = () => {
    
    signout()
    .then(() => {
        notify("info", "Logged Out");
    })

    const redirectOnLogOut = () => {
        return <Redirect to={{
                                    pathname: "/"
                                }} />
    }

    return (
        <React.Fragment>
            {redirectOnLogOut()}
        </React.Fragment>
    );
}

export default LogoutComponent;