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

class Join extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.u);
  }
  render() {
    return (
      <div>
        <button>Joindre la partie</button>

        {this.props.test}
      </div>
    );
  }
}

export default Join;
