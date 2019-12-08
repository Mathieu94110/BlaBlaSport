import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, InputGroup, InputGroupAddon, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Api from "../service/Api"


export default class extends Component {
    constructor(props){
        super(props)
        this.api = new Api()
        this.state= {
            nom: null
        }
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        if (!token){
            window.location = "/"
        }

    }
    handleInputChange = (event) =>{
		const target = event.target;
		const name = target.name;
		this.setState({
		  [name]: target.value
		});
	}
    createSport=()=>{
        if (this.state.nom.length>=2 && this.state.nom!=null ){
            this.api.createSport(this.state.nom).then(res=>{
                console.log(res)
            })

        }else{
        alert ("Veuillez remplir tous les champs");

        }

    }
    render (){
        return (

            <div>
                                <Head>
                <title>Créer un sport</title>
                <link href="/static/styles.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous"/>

                </Head>
                
                
                
                <div>
                    <InputGroup>
                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                
                
                <Input value={this.state.value} onChange={this.handleInputChange} name="nom"/>
                <Button onClick={this.createSport}>Créer</Button>
                </InputGroup>
                
                 
                </div>
                
                
            </div>


        )
    }
}
