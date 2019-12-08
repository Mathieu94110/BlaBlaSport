import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class extends Component {
    constructor(props){
        super(props)
        this.state= {}
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        if (!token){
            window.location = "/"
        }

    }

    redirectNewsport = () => {
            window.location='/newsport'

    }



    render (){
        return (

            <div>
                
                
                
                Welcome to your page
                <div><p>Vous ne trouvez pas votre sport, rajoutez le !</p>
                 <Button  onClick={this.redirectNewsport} style={{backgroundColor:"blue" , color:"white", borderRadius:"10px"}}>Creer un sport</Button>
                
                </div>
                
                
            </div>


        )
    }
}
