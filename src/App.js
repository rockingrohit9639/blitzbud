import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Admin/Dashboard';
import { Navbar } from './Components/Navbar/Navbar';
import server from "./axios/instance";
import { useDataLayerValues } from './datalayer';
import { actions } from "./reducer";
import Logout from './Components/Logout/Logout';
import Profile from './Components/Manager/Profile';


function App()
{

  const [{ isAuthenticated }, dispatch] = useDataLayerValues();


  const verifyUser = async () => {
    
    try {
      const res = await server.post("/authenticate");
      const user = await res.data;
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

            dispatch({
              type: actions.SET_ROLE,
              role: userData.role,
          });

    }
    catch(err) {
      console.log(err);
      console.log(err.response);
    }

  }
  
  
  useEffect(() =>
  {

    if (localStorage.getItem("@token"))
    {
      const token = localStorage.getItem("@token");
      if (token)
      {
        server.defaults.headers.common['authorization'] = 'Bearer' + ' ' + token;
      } else
      {
        delete server.defaults.headers.common['authorization'];
      }
    }
    else {
      dispatch({
        type: actions.SET_AUTH,
        auth: false
      })
    }

    verifyUser();

  }, [localStorage.getItem("@token")]);
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
