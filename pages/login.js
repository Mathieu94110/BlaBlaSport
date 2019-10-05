import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Api from "../service/Api"

export default class Login extends Component {

	constructor(props){
		super(props);
        this.api = new Api()
		this.state = {
            showLogin: true, // variable boolean qui change en fonction du formulaire login ou inscription
            name: null,
            email: null,
            password: null
		};
		

    }

    handleInputChange = (event) =>{
		const target = event.target;
		const name = target.name;
		this.setState({
		  [name]: target.value
		});
	}

    switch = () =>{
        // on met à jour la variable boolean showLogin en le remplaçant par son contraire
        // si c'est true, ça devient false et vice-versa
        this.setState({showLogin: !this.state.showLogin})
    }

    createUser = () =>{
        this.api.createUser(this.state.name, this.state.email, this.state.password).then(res=>{
            console.log(res)
        })
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
                                <div>
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
                                </div>
                                : 
                                <div>
                                    Inscription
                                    <FormGroup row>
                                    <Label for="exampleName" sm={2}>Nom</Label>
                                    <Col sm={10}>
                                        <Input type="text" name="name" id="exampleName" placeholder="with a placeholder" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <Button style={{alignSelf:"center"}} onClick={this.createUser}>S'inscrire</Button>
                                    <Button color="link" onClick={this.switch}>Déjà un compte ? Connectez-vous</Button>
                                </div>

                            }

                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                    
                </Container>




            </div>
        )
    }



}