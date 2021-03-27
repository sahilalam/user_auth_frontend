import React from "react";
import {Row,Col} from "react-bootstrap";

export default class Content extends React.Component{
    render()
    {
        return (
            <Row>
            <Col xs="12" className="box box-shadow">
                Hello {this.props.data.name}
            </Col>
            </Row>
        )
    }
}