import React from "react";
import Head from "next/head";
import { Button } from "reactstrap";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      done: false,
      visible: true
    };
  }
  changeDone = () => {
    this.setState({ done: !this.state.done });
    console.log(this.state.done);
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
        <p style={{ textDecoration: this.state.done ? "line-through" : null }}>
          {this.state.name}
        </p>
        <Button onClick={this.changeDone}>La puissance</Button>
        {this.state.visible == true ? <p>la puissance</p> : <p>Relou</p>}
      </div>
    );
  }
}

export default Task;
