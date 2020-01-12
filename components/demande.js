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
          <Label for="exampleEmail">Sport</Label>
          <Input
            value={this.state.sport}
            type="text"
            name="sport"
            onChange={this.handleInputChange}
            id="exampleEmail"
            placeholder="Foot"
          />
        </FormGroup>
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
