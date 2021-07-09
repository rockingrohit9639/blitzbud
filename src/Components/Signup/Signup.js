import React, { useState, useEffect } from 'react';
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
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from '../../datalayer';
import { actions } from '../../reducer';

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Signup()
{
    const history = useHistory();
    const classes = useStyles();
    const [{ isAuthenticated }, dispatch] = useDataLayerValues();
    const [formData, setFormData] = useState({
        fname: "",
        uname: "",
        contactno: "",
        email: "",
        password: "",
    });

    useEffect(() =>
    {
        console.log(isAuthenticated);
        isAuthenticated && history.push("/dashboard");
    }, [isAuthenticated, history]);

    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setFormData(prevData =>
        {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }

    const clearData = () =>
    {
        setFormData({
            fname: "",
            uname: "",
            contactno: "",
            email: "",
            password: "",
        })
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const res = await server.post("/register", formData);

            if (res.status === 200)
            {
                localStorage.setItem('@token', res.data.token);
                const user = await res.data.user;
                const userData = {
                    fname: user.fname,
                    uname: user.uname,
                    contactno: user.contactno,
                    email: user.email,
                    role: user.role
                }

                dispatch({
                    type: actions.SET_AUTH,
                    auth: true
                })

                dispatch({
                    type: actions.SET_USER,
                    user: userData,
                });
            }
        }
        catch (err)
        {
            window.alert(err.response.data.error);
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
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="fname"
                        label="Full Name"
                        type="text"
                        autoFocus
                        id="fname"
                        value={formData.fname}
                        onChange={handleChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="uname"
                        label="Username"
                        type="text"
                        id="uname"
                        value={formData.uname}
                        onChange={handleChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contactno"
                        label="Contact Number"
                        type="mobile"
                        id="contactno"
                        value={formData.contactno}
                        onChange={handleChange}
                    />

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
                        Sign Up
                    </Button>
                </form>
                <Link to="/">Already have an account?</Link>
            </div>
        </Container>
    )
}

export default Signup;