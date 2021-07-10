import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDataLayerValues } from "../../datalayer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "#FFF",
    }
}));

export const Navbar = () =>
{

    const classes = useStyles();
    const [{ isAuthenticated }, dispatch] = useDataLayerValues();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Blitzbud
                    </Typography>

                    {
                        isAuthenticated ? <Button color="inherit">
                            <Link to="/logout" className={classes.link}>Logout</Link>
                        </Button>
                            :
                            <div>
                                <Button color="inherit">
                                    <Link to="/" className={classes.link}>Login</Link>
                                </Button>
                                <Button color="inherit">
                                    <Link to="/signup" className={classes.link}>Signup</Link>
                                </Button>
                            </div>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}