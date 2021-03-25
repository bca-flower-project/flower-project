
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
//import components
import Home from './components/Home';
import Profile from './components/Profile';
import Connect from './components/Connect';
import Create from './components/Create';
import Global from './components/Global';
import Login from './components/Login';
import Nav from './components/Nav';
import PastFlowers from './components/PastFlowers';
import Settings from './components/Settings';
import Signup from './components/Signup'

import { BrowserRouter } from 'react-router-dom'
import {firebaseApp, auth, googleProvider, facebookProvider} from './fire.js'


//write all login functionality on app


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path={"/"}  component={Home}/>
        <Route path={"/Profile"} component={Profile}/>
        <Route path={"/Connect"} component={Connect}/>
        <Route path={"/Create"} component={Create}/>
        <Route path={"/Global"} component={Global}/>
        <Route path={"/Signup"} component={Signup}/>
        <Route path={"/Login"} component={Login}/>
        <Route path={"/PastFlowers"} component={PastFlowers}/>
        <Route path={"/Settings"} component={Settings}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;


//manage user login in app. pass props to whatever page we need to use them too