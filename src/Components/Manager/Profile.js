import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDataLayerValues } from '../../datalayer';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        alignItems: "center",
        marginTop: "1rem",
    },
    label: {
        fontSize: "1.2rem",
        marginRight: "1rem",
    }

}));

function Profile()
{
    const classes = useStyles();
    const history = useHistory();
    const [{ isAuthenticated, user }] = useDataLayerValues();

    useEffect(() =>
    {
        if (!isAuthenticated || user?.role === "ADMIN")
        {
            history.push("/");
        }
    }, [isAuthenticated, user]);

    return (
        <div className={classes.container}>

            <div className={classes.row}>
                <label className={classes.label}>Full Name : </label>
                <h1> { user?.fname } </h1>
            </div>

            <div className={classes.row}>
                <label className={classes.label}>Username : </label>
                <h1> { user?.uname } </h1>
            </div>

            <div className={classes.row}>
                <label className={classes.label}>Email : </label>
                <h1> { user?.email } </h1>
            </div>

            <div className={classes.row}>
                <label className={classes.label}>Contact No. : </label>
                <h1> { user?.contactno } </h1>
            </div>

            <div className={classes.row}>
                <label className={classes.label}>Role : </label>
                <h1> { user?.role } </h1>
            </div>

        </div>
    )
}

export default Profile;
