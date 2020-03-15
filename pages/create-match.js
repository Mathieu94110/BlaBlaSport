import React, { Component } from "react";
import Head from "next/head";

import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CreateMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nb_participants: 1,
      participants: [""]
    };
  }

  handleNbParticipantsChange = e => {
    let newParticipants = [];
    for (let i = 0; i < parseInt(e.target.value); i++) {
      newParticipants.push("");
    }
    this.setState({ participants: newParticipants });
  };
  render() {
    return (
      <div>
        <Head>
          <title>BlaBlaSport</title>
          <link href="/static/styles.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          />
        </Head>
        <div style={{ width: "500px" }}>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Nombre de participants</Label>
              <Input
                type="number"
                name="nb_participants"
                placeholder="entrez le nombre de participants"
                onChange={this.handleNbParticipantsChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Les participants</Label>
              {this.state.participants.map((participant, index) => {
                return (
                  <Input
                    type="text"
                    value={participant}
                    name="participants"
                    placeholder={"Entrez le nom du participant " + index}
                  />
                );
              })}
            </FormGroup>

            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateMatch;
