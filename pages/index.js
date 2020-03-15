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
import { Badge } from "reactstrap";
import CarouselSection from "../components/CarouselSection";
import MapComponent from "../components/mapComponent";
let centres = require("../public/data.json");
centres = centres.slice(1, 100);

class Home extends Component {
  constructor(props) {
    super(props);
    let categories = [...new Set(centres.map(sport => sport.fields.eqt_type))];
    this.state = {
      username: "Tata",
      bgList: ["homeSection1", "homeSection2", "homeSection3"],
      selectedBG: 0,
      date: new Date(),
      activated: true,
      size: 50,
      categories: categories,
      categorie: categories[0],
      centres: centres
    };

    console.log(categories);
  }

  handleSelectChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState(
      {
        [name]: target.value
      },
      () => {
        let newcentres = centres.filter(
          centre => centre.fields.eqt_type == target.value
        );
        this.setState({ centres: newcentres });
      }
    );
  };

  componentDidMount() {
    setInterval(() => {
      if (this.state.selectedBG == this.state.bgList.length - 1) {
        this.setState({ selectedBG: 0 });
      }
      let index = this.state.selectedBG;
      index = index + 1;
      this.setState({ selectedBG: index });
    }, 5000);

    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };
  stopInterval = () => {
    this.setState(
      {
        activated: !this.state.activated
      },
      () => {
        if (this.state.activated === false) {
          console.log("Stopping");
          clearInterval(this.timer);
        } else {
          this.timer = setInterval(() => {
            console.log(this.state.date);
            this.setState({ date: new Date() });
          }, 1000);
        }
      }
    );
  };
  changeSize = () => {
    this.setState({
      size: this.state.size + 10
    });
  };

  decreaseSize = () => {
    this.setState({
      size: this.state.size - 30
    });
  };

  render() {
    return (
      <div className="body">
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
                    <p className="logoText">BlaBla</p>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="nav">
                  <div style={{ flex: 1 }}>
                    <Button color="link" className="link" href="/about">
                      A PROPOS
                    </Button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Button color="link" className="link">
                      NOUS CONTACTER
                    </Button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Button color="link" className="link" href="/login">
                      MON COMPTE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={this.state.bgList[this.state.selectedBG]}>
          <div>
            {this.state.date.toLocaleDateString()}{" "}
            {this.state.date.toLocaleTimeString()}
            <Button
              onClick={this.stopInterval}
              color={this.state.activated === true ? "success" : "danger"}
            >
              {this.state.activated == true
                ? "Arrêter le compteur"
                : "Redémarrer le compteur"}
            </Button>
          </div>
          <div
            onDoubleClick={this.decreaseSize}
            onClick={this.changeSize}
            style={{
              width: this.state.size + "px",
              height: this.state.size + "px",
              backgroundColor: "green"
            }}
          ></div>

          <Container style={{ marginTop: "" }}>
            <Row>
              <Col sm="8">
                <div className="title">
                  <div>
                    Bonjour {this.state.username} BlaBlaSport vous permet de
                    trouver un partenaire de sport à tout moment
                  </div>
                  <div className="text-box">
                    <div>Simple</div>
                    <div>Rapide</div>
                    <div>Instantané</div>
                  </div>
                </div>
              </Col>
              <Col sm="4"></Col>
            </Row>
          </Container>
        </section>

        <section className="carouselSection">
          <CarouselSection />
        </section>
        <div>
          <Input
            type="select"
            name="categorie"
            value={this.state.categorie}
            onChange={this.handleSelectChange}
          >
            {this.state.categories.map((categorie, index) => {
              return <option key={index}>{categorie}</option>;
            })}
          </Input>
        </div>
        <div className="map">
          <MapComponent centres={this.state.centres} />
        </div>

        <section className="searchSection"></section>
      </div>
    );
  }
}

export default Home;
