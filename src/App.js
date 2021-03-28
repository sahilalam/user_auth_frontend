import './App.css';
import React from "react";
import {BrowserRouter,Route,NavLink, Redirect} from "react-router-dom";
import RegisterMail from "./register_mail.js";
import RegisterUser from "./register_user.js";
import Login from "./login.js";
import {Row,Col} from "react-bootstrap";
import Context from "./Context.js";
import Content from './Content';

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      logged_in:false
    }
  }
  login=()=>{
    this.setState({logged_in:true});
}
  logout=()=>{
    this.setState({logged_in:false});
  }
  render(){
    return (
      <div>
      <BrowserRouter>
          <Row className="nav-bar ">
            <Col md="7" xs="12" className="text-align-left">
            <h4 className="heading">User Authentication</h4>
            </Col>
            <Col md="5" xs="12">
              <Row className="justify-content-end">
              {
              this.state.logged_in
              ?
              <Col xs="6" md="5" onClick={this.logout}>
                <NavLink to="/register" className="nav-link buton">
                  Logout
                </NavLink>
              </Col>
              :
              <>
                <Col xs="6" md="5">
                <NavLink to="/register" className="nav-link buton">
                  Register
                </NavLink>
                </Col>
                <Col xs="6" md="5">
                  <NavLink to="/login" className="nav-link buton">
                      Login
                  </NavLink>
                </Col>
              </>
            }
              </Row>
            </Col>
            
          </Row>
          <Row className="p-3">
            <Route exact path="/">
              <Redirect to="/register"></Redirect>
            </Route>
            <Route exact path="/register" component={RegisterMail}></Route>
            <Route exact path="/register/:encrypted" component={RegisterUser}></Route>
            <Context.Provider value={
              {
                login:this.login
              }
            }>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home">
                {this.state.logged_in
                ?
                  <Content />
                :
                  <Redirect to="/register"></Redirect>
                }
              </Route>
            </Context.Provider>
          </Row>
        
          
          
      </BrowserRouter>
      </div>
      
      
    )
  }
}

export default App;
