import React from "react";
import { Form,Row,Col ,Modal,Spinner} from "react-bootstrap";
import Content from "./Content.js"
import {BrowserRouter,Redirect,Route} from "react-router-dom";
import Context from "./Context.js";

export default class Login extends React.Component{
    static contextType=Context;
    username=React.createRef();
    password=React.createRef();
    constructor(props)
    {
        super(props);
        this.state={
            toast:false,
            successful:false,
            spinner:false,
            data:null
        }
    }
    toggleToast=()=>{
        this.setState({toast:!this.state.toast});
    }
    login=async(event)=>{
        event.preventDefault();
        this.setState({spinner:true});
        this.toggleToast();
        try{
            let details={
                username:this.username.current.value,
                password:this.password.current.value
            }
            let body=[];
            for(let key in details)
            {
                let ek=encodeURIComponent(key);
                let ep=encodeURIComponent(details[key]);
                body.push(ek+"="+ep);
            }
            body=body.join('&');
            let data=await fetch('https://userauth-service.herokuapp.com/login',{
                method:'POST',
                body:body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }

            });
            data=await data.json();
            if(data.data)
            {
                this.context.login();
                this.setState({data:data.data,successful:true});
            }
            else
            {
                this.setState({data:data.message,successful:false,spinner:false});
            }
            
            ;

        }
        catch(err)
        {
            console.log(err)
            this.setState({data:err.message,successful:false,spinner:false});
        }
    }
    render()
    {
        return (
            <Col xs="12">   
                {this.state.successful
                ?
                    
                    <BrowserRouter>
                        <Redirect to="/home"></Redirect>
                        <Route path="/home">
                            <Content data={this.state.data}/>
                        </Route>
                        
                    </BrowserRouter>
                    
                :
                    <Row className="justify-content-center">
                        <Col md="6" xs="12">
                            <Form onSubmit={this.login} className="box box-shadow text-center">
                                <h5 className="heading"> Login </h5>
                                <Form.Control ref={this.username} type="text" placeholder="enter your username.." required={true} className="mb-2" />
                                <Form.Control ref={this.password} type="password" placeholder="enter password.." required={true} className="mb-2" />
                                <button type="submit" className="buton mb-2">Submit</button>
                            </Form>
                            <Modal show={this.state.toast} onHide={this.toggleToast} backdrop="static">
                                {
                                    this.state.spinner
                                    ?
                                    <Modal.Header>Please Wait..<Spinner animation="border" /></ Modal.Header>
                                    :
                                    <Modal.Header closeButton>{this.state.data}</Modal.Header>
                                } 
                            </Modal> 
                        </Col>
                    </Row>

                }
                
            </Col>
        )
    }
}