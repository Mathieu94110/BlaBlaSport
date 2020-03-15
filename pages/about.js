import React, { Component } from 'react';
import Head from 'next/head';

import { Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';






class About extends Component {

	constructor(props){
		super(props);

		this.state = {
			
	
		};
		

	}

	

	render(){


		return (
		  <div className="body">
		    <Head>
		      <title>BlaBlaSport</title>
		       <link href="/static/styles.css" rel="stylesheet" />
		       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous"/>

		    </Head>

			<header className="header">
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<div style={{display:"flex", width:"200px"}}>
										<div style={{"flex":1}}>
											<img alt="logo" src="/static/images/logo.png" className="logo"/>

										</div>
										<div style={{"flex":2}}>
											<p className="logoText">BlaBlaSport</p>
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
											<Button color="link" className="link" href="/login">MON COMPTE</Button>
										</div>
									</div>

								</div>
							</div>
						</div>


					</header>

				<section className="homeSection">

					<Container style={{marginTop:""}}>
					 <Row>
						 <Col sm="8">
							<div className="title">
		 						<div>Bonjour {this.state.username} BlaBlaSport vous permet de trouver un partenaire de sport à tout moment</div>
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




                    
		  </div>
		);
	}
}

export default About;
