import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from 'react-router-dom';
import logo from '../images/Capture.PNG'
const Navbar = () =>{
    return(
      <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={logo}  alt="logo"/></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                    
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Registration</NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                      </li>
                      
                    </ul>
                    
                  </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;