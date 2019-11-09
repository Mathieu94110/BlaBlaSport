import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


import Api from "../service/Api"

export default class Login extends Component {

	constructor(props){
		super(props);
        this.api = new Api()
		this.state = {
            showLogin: true, // variable boolean qui change en fonction du formulaire login ou inscription
            name: null,
            email: null,
            password: null,
            message: null
        };
        

		
    }


        componentDidMount(){
            let token = localStorage.getItem('token')
            if(token){
                window.location = "/user-template"
            }
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
            console.log(res.data)
            if (res.data.success){
                alert ("VOus avez bien crré un compte.")
            }else{
                this.setState({message: "Il existe déja un compte avec cette adresse mail, veuillez vous connecter"})
            }
        })
    }

    login = () =>{
        this.api.login(this.state.email, this.state.password).then(res=>{
            if(res.data.success){
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                window.location = "/user-template"
            }else{
                this.setState({message: res.data.message})
            }
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
                                <div className="cardCustom">
                                    Login
                                    <FormGroup row>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="Mot de passe" onChange={this.handleInputChange} />
                                    </Col>
                                    </FormGroup>
                                
                                    <Button style={{alignSelf:"center"}} onClick={this.login}>Se connecter</Button>
                                    <Button color="link" onClick={this.switch}>Pas encore de compte ? Crééz un compte</Button>
                                </div>
                                : 
                                <div className="cardCustom">
                                    Inscription
                                    <FormGroup row>
                                    <Col sm={10}>
                                        <Input type="text" name="name" id="exampleName" placeholder="Votre nom complet" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Votre Email" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="Votre mot de passe" onChange={this.handleInputChange}/>
                                    </Col>
                                    </FormGroup>
                                    <Button style={{alignSelf:"center"}} onClick={this.createUser}>S'inscrire</Button>
                                    <Button color="link" onClick={this.switch}>Déjà un compte ? Connectez-vous</Button>
                                </div>

                            }
                            {
                                this.state.message != null ?
                                <Alert color="danger" style={{marginTop:"20px"}}>
                                    {this.state.message}
                                </Alert>
                                : null
                            }
  
                        </Col>
                        <Col sm="3"></Col>
                    </Row>

                </Container>




            </div>
        )
    }



}