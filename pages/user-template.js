import React, { Component } from "react";
import Head from "next/head";
import Demande from "../components/demande";
import Join from "../components/Join";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
  FormGroup
} from "reactstrap";

import Api from "../service/Api";
import { join } from "path";

export default class extends Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.state = {
      user: {},
      token: null,
      openDropdown: false,
      sports: [],
      category: "Football",
      categories: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (!token || !user) {
      window.location = "/";
      return;
    }

    this.setState({
      user: JSON.parse(user),
      token: token
    });

    this.api.getSports().then(res => {
      console.log(res.data.sports);
      this.setState({ sports: res.data.sports });
    });
  }

  toggle = () => this.setState({ openDropdown: !this.state.openDropdown });

  redirectNewsport = () => {
    window.location = "/newsport";
  };

  logOut = () => {
    localStorage.clear();
    window.location = "/";
  };

  render() {
    let sports = this.state.sports.map((sport, index) => {
      return (
        <Col md={3} key={index}>
          {sport.nom}
        </Col>
      );
    });
    return (
      <div>
        <Head>
          <title>Dashboard</title>
          <link href="/static/styles.css" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          />
        </Head>

        <header className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div style={{ display: "flex", width: "200px" }}>
                  <div style={{ flex: 1 }}>
                    <img
                      alt="logo"
                      src="/static/images/logo.png"
                      className="logo"
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <p className="logoText">BlaBlaSport</p>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="nav">
                  <div style={{ flex: 1 }}>
                    <Button
                      color="link"
                      className="link"
                      href="/user-template"
                    ></Button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Button color="link" className="link">
                      NOUS CONTACTER
                    </Button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Dropdown
                      isOpen={this.state.openDropdown}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret>
                        {this.state.user.email}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>{this.state.user.name}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logOut}>
                          Déconnexion
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>
          <Button color="primary" onClick={this.redirectNewsport}>
            Creer un sport
          </Button>
        </div>

        <Container>
          <Row style={{ textAlign: "center" }}>
            <Col md={3}>
              <img className="sportImage" src="/static/images/football.png" />
              <div>
                <p>Football</p>
                <p>Prochaine séance prévue dans</p>
              </div>
            </Col>

            <Col md={3}>
              <img
                className="sportImage"
                src="/static/images/basket-ball.png"
              />
              <div>
                <p>basket-ball</p>
                <p>Prochaine séance prévue dans</p>
              </div>
            </Col>

            <Col md={3}>
              <img className="sportImage" src="/static/images/tennis.png" />
              <div>
                <p>Tennis</p>
                <p>Prochaine séance prévue dans</p>
              </div>
            </Col>

            <Col md={3}>
              <img className="sportImage" src="/static/images/baseball.png" />
              <div>
                <p>Baseball</p>
                <p>Prochaine séance prévue dans</p>
              </div>
            </Col>
          </Row>
          <Row>{sports}</Row>
        </Container>
        <Demande
          firstName={"Mathieu"}
          lastName={"Renault"}
          sport={"Football"}
        />
        <Join test={""} />
      </div>
    );
  }
}
