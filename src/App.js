import './App.css';
import React from "react";
import {BrowserRouter,Route,NavLink, Redirect} from "react-router-dom";
import RegisterMail from "./register_mail.js";
import RegisterUser from "./register_user.js";
import Login from "./login.js";
import {Row,Col} from "react-bootstrap";

class App extends React.Component{
  render(){
    return (
      <div>
      <BrowserRouter>
          <Row className="nav-bar justify-content-end">
            <Col xs="7">
            <h4 className="heading">User Authentication</h4>
            </Col>
            <Col xs="2">
              <NavLink to="/register" className="nav-link buton">
                Register
              </NavLink>
            </Col>
            <Col xs="2">
              <NavLink to="/login" className="nav-link buton">
                   Login
              </NavLink>
            </Col>
          </Row>
          <Row className="p-3">
            <Route exact path="/">
              <Redirect to="/register"></Redirect>
            </Route>
            <Route exact path="/register" component={RegisterMail}></Route>
            <Route exact path="/register/:encrypted" component={RegisterUser}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Row>
        
          
          
      </BrowserRouter>
      </div>
      
      
    )
  }
}

export default App;
