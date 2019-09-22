import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import Api from '../service/Api.js'





class Home extends Component {

	constructor(props){
		super(props);

		this.state = {

		};
		

	}

	

	handleInputChange = (event) =>{
		const target = event.target;
		const name = target.name;
		this.setState({
		  [name]: target.value
		});
	}


	render(){


		return (
		  <div className="body">
		    <Head>
		      <title>BlaBlaSport</title>
		       <link href="/static/styles.css" rel="stylesheet" />
		       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous"/>

		    </Head>



				<section className="homeSection">
					<header className="header">
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<div style={{display:"flex", width:"200px"}}>
										<div style={{"flex":1}}>
											<img alt="logo" src="/static/images/logo.png" className="logo"/>

										</div>
										<div style={{"flex":2}}>
											<p className="logoText">My Kolor'z</p>
										</div>
									</div>
								</div>

								<div className="col-md-8">

									<div className="nav">
										<div style={{"flex":1}}>
											<Button color="link" className="link" >A PROPOS</Button>
										</div>
										<div style={{"flex":1}}>
											<Button color="link" className="link" >NOUS CONTACTER</Button>
										</div>
										<div style={{"flex":1}}>
											<Button color="link" className="link">MON COMPTE</Button>
										</div>
									</div>

								</div>
							</div>
						</div>


					</header>
					<Container style={{marginTop:"-100px"}}>
					 <Row>
						 <Col sm="8">
							<div className="title">
		 						<div>BlaBlaSport vous permet de trouver un partenaire de sport à tout moment</div>
								<div className="text-box">
									<div>Simple</div>
									<div>Rapide</div>
									<div>Instantané</div>
								</div>
		 					</div>
							 
						 </Col>
						 <Col sm="4">
						 		
						 </Col>
					 </Row>
				 </Container>
				</section>

				<section className="carouselSection">
					
				</section>

				<section className="searchSection">
					
				</section>





		  </div>
		);
	}
}

export default Home;
