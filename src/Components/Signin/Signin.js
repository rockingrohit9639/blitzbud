import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import server from "../../axios/instance";
import { useDataLayerValues } from '../../datalayer';
import { actions } from '../../reducer';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Signin()
{
    const classes = useStyles();
    const [{ isAuthenticated, role }, dispatch] = useDataLayerValues();
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() =>
    {
        if (isAuthenticated)
        {
            if (role === "ADMIN")
            {
                history.push("/dashboard");
            }
            else if (role === "MANAGER")
            {
                history.push("/profile");
            }
        }
    }, [isAuthenticated, history, role])

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setFormData(prevData =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const clearData = () =>
    {
        setFormData({
            email: "",
            password: "",
        })
    }

    const handleSignin = async (e) =>
    {
        e.preventDefault();

        try
        {
            const res = await server.post("/login", formData);
            const role = await res.data.role;

            localStorage.setItem('@token', res.data.token);

            dispatch({
                type: actions.SET_AUTH,
                auth: true
            })

            dispatch({
                type: actions.SET_ROLE,
                role: role,
            });

        }
        catch (err)
        {
            console.log(err);
            if (err.response.data.error)
            {
                window.alert(err?.response?.data?.error);
            }
        }

        clearData();
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSignin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
                <Link to="/signup">Did not have an account?</Link>
            </div>
        </Container>
    )
}

export default Signin;
