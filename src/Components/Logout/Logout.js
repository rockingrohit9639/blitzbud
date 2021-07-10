import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { actions } from "../../reducer";

const Logout = () =>
{

    const history = useHistory();
    const [{}, dispatch] = useDataLayerValues();
    useEffect(() =>
    {
        localStorage.setItem("@token", null);

        dispatch({
            type: actions.SET_AUTH,
            auth: false,
        })

        dispatch({
            type: actions.SET_USER,
            user: null,
        })

        dispatch({
            type: actions.SET_ROLE,
            role: "",
        })

        history.replace("/");
    }, [])

    return (
        <div>
            <h1> Logging you out... </h1>
        </div>
    );
}

export default Logout;