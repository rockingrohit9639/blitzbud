import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Admin/Dashboard';
import server from "./axios/instance";
import { useDataLayerValues } from './datalayer';
import { actions } from "./reducer";


function App()
{

  const [{ isAuthenticated }, dispatch] = useDataLayerValues();
  
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

  }, [localStorage.getItem("@token")]);
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
