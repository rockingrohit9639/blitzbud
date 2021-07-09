import './App.css';
import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
