import React from "react";
import {Row,Col,Form,Modal,Spinner} from "react-bootstrap";

export default class RegisterMail extends React.Component{
    email=React.createRef();
    constructor(props)
    {
        super(props);
        this.state={
            toast:false,
            spinner:false,
            message:""
        }
    }
    toggleToast=()=>{
        this.setState({toast:!this.state.toast});
    }
    register=async(event)=>{
        event.preventDefault();
        this.setState({spinner:true})
        this.toggleToast();
        try{
            
            if(this.email.current.checkValidity()){
                let details={
                    email:this.email.current.value
                }
                let body=[];
                for(let property in details)
                {
                    let encodedKey = encodeURIComponent(property);
                    let encodedValue = encodeURIComponent(details[property]);
                    body.push(encodedKey + "=" + encodedValue);
                }
                body=body.join('&');
                
                let data=await fetch("https://userauth-service.herokuapp.com/register",{
                    method:"POST",
                    body:body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                })
                data=await data.json();
                this.setState({message:data.message,spinner:false});
                
            }
            
        }
        catch(err)
        {
            this.setState({message:err.message,spinner:false});
            
        }
    }
    
    render()
    {
    
        return (
            <Col xs="12">
                <Row className="justify-content-center">
                <Col xs="6">
                    <Form onSubmit={this.register} className="box box-shadow text-center">
                        <h5 className="heading">Register your E-Mail</h5>
                        <Form.Control ref={this.email} type="email" required={true} placeholder="Enter your email to register.." className="mb-2" />
                        <button type="submit" className="buton mb-2">Submit</button>
                    </Form>
                </Col>  
                <Modal show={this.state.toast} onHide={this.toggleToast} backdrop="static">
                        {this.state.spinner ? <Modal.Header>Please Wait..<Spinner animation="border" /> </Modal.Header >: <Modal.Header closeButton>{this.state.message}</Modal.Header> }
                </Modal> 
                </Row>
                
            </Col>
            
        )
    }
}