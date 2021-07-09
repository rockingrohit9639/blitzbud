import './App.css';
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Admin/Dashboard';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
