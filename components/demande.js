import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class Demande extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.u);

    this.state = {
      lastName: this.props.lastName,
      firstName: this.props.firstName,
      sport: this.props.sport,
      date: "",
      nbParticipant: ""
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };

  handleSelectChange = e => {
    this.setState({ sport: e.target.value });
  };

  render() {
    return (
      <div>
        {" "}
        <FormGroup>
          <Label for="exampleEmail">LastName</Label>
          <Input
            value={this.state.lastName}
            type="text"
            name="lastName"
            onChange={this.handleInputChange}
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">firstName</Label>
          <Input
            value={this.state.firstName}
            type="text"
            name="firstName"
            onChange={this.handleInputChange}
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label>Choisir sport</Label>

          <Input
            onChange={this.handleSelectChange}
            type="select"
            name="selectMulti"
            name="select"
            value={this.state.sport}
          >
            <option value="Football">Football</option>
            <option value="Baseball">Baseball</option>
            <option value="Voleyball">Voleyball</option>
            <option value="Ski">Ski</option>
            <option value="Karting">Karting</option>
          </Input>
        </FormGroup>
        {this.state.sport == "Football" ? (
          <div>
            Trouver des pratiquants de football{" "}
            <img src="/static/images/logo-football.jpg"></img>
          </div>
        ) : null}
        {this.state.sport == "Baseball" ? (
          <div>
            Trouver des pratiquants de baseball{" "}
            <img src="/static/images/baseball.png"></img>{" "}
          </div>
        ) : null}
        {this.state.sport == "Voleyball" ? (
          <div>
            Trouver des pratiquants de voleyball{" "}
            <img src="/static/images/baseball.png"></img>{" "}
          </div>
        ) : null}
        {this.state.sport == "Ski" ? (
          <div>
            Trouver des pratiquants de ski{" "}
            <img src="/static/images/baseball.png"></img>{" "}
          </div>
        ) : null}
        {this.state.sport == "Karting" ? (
          <div>
            Trouver des pratiquants de karting{" "}
            <img src="/static/images/baseball.png"></img>{" "}
          </div>
        ) : null}
        <FormGroup>
          <Label for="exampleEmail">Date</Label>
          <Input
            type="text"
            name="Date"
            onChange={this.handleInputChange}
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nb de participant</Label>
          <Input
            type="text"
            name="Nb de participant"
            onChange={this.handleInputChange}
            id="exampleEmail"
            placeholder="with a placeholder"
          />
        </FormGroup>
      </div>
    );
  }
}

export default Demande;
