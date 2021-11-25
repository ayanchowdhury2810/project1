import React from 'react'
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import {Route, Switch} from 'react-router-dom';
import './App.css'
import Error from './components/Error';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.css'

const App = () =>{
  return(
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/About">
          <About/>
        </Route>

        <Route path="/Contact">
          <Contact/>
        </Route>

        <Route path="/Login">
          <Login/>
        </Route>

        <Route path='/Signup'>
          <Signup/>
        </Route>

        <Route path='/Logout'>
          <Logout/>
        </Route>

        <Route>
          <Error/>
        </Route>
      </Switch>

      {/* <Navbar/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Contact' component={Contact}/>
            <Route exact path='/About' component={About}/>
            <Route exact path='/Login' component={Login}/>
            <Route exact path='/Signup' component={Signup}/>
            <Route component={Error}/>
        </Switch> */}
    </>
  )
}
 export default App;