import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  FormGroup,
  Input,
  Label,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from "reactstrap";
import Head from "next/head";
import axios from "axios";

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sports: [
        "football",
        "voleyball",
        "baseball",
        "ski",
        "karting",
        "plongée"
      ],
      users: []
    };
  }

  getData = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      this.setState({ users: res.data });
    });
  };

  render() {
    let users = this.state.users.map((user, index) => {
      return <div>{user.name}</div>;
    });
    let cards = this.state.sports.map((card, index) => {
      return (
        <Col md="4">
          <Card>
            <CardImg
              top
              style={{ width: "50%" }}
              src={"/static/images/" + card + ".png"}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{card}</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button>Rejoindre la partie</Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return (
      <div>
        <header>
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
        </header>
        <h2>Les matchs en cours </h2>

        <Row>{cards}</Row>
        <button onClick={this.getData}>Obtenir les users</button>
        {users}
      </div>
    );
  }
}

export default Matches;
