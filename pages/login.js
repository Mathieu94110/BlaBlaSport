import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Login extends Component {

	constructor(props){
		super(props);

		this.state = {
            showLogin: true // variable boolean qui change en fonction du formulaire login ou inscription
		};
		

    }

    switch = () =>{
        // on met à jour la variable boolean showLogin en le remplaçant par son contraire
        // si c'est true, ça devient false et vice-versa
        this.setState({showLogin: !this.state.showLogin})
    }



    render(){
        return (
            <div className="bgtennis">
                <Head>
                <title>Se connecter</title>
                <link href="/static/styles.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous"/>

                </Head>

                <Container style={{paddingTop:"100px"}}>
                    
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6">
                            {this.state.showLogin == true ?
                                <Form>
                                    Login
                                    <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                    </Col>
                                    </FormGroup>
                                    <Button style={{alignSelf:"center"}}>Se connecter</Button>
                                    <Button color="link" onClick={this.switch}>Pas encore de compte ? Crééz un compte</Button>
                                </Form>
                                : 

                                <Form>
                                    Inscription
                                    <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                    </Col>
                                    </FormGroup>
                                    <Button style={{alignSelf:"center"}}>S'inscrire</Button>
                                    <Button color="link" onClick={this.switch}>Déjà un compte ? Connectez-vous</Button>

                                </Form>

                            }

                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                    
                </Container>




            </div>
        )
    }



}