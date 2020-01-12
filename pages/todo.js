import React from "react";
import Head from "next/head";
import {} from "reactstrap";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Task from "../components/task";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      listeTasks: []
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });

    console.log(this.state);
  };

  addTask = () => {
    let liste = this.state.listeTasks;
    liste.push(this.state.value);
    this.setState({ listeTasks: liste });
    console.log(this.state.value);
  };
  deleteTask = () => {
    this.setState({ listeTasks: [] });
  };
  render() {
    let tasks = this.state.listeTasks.map((name, index) => (
      <Task name={name} />
    ));
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

        <form>
          <InputGroup style={{ maxWidth: "50%" }}>
            <Input
              placeholder="and..."
              onChange={this.handleInputChange}
              name="value"
            />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={this.addTask}>
                Add Task
              </Button>
              <Button
                color="success"
                style={{ marginLeft: "10px" }}
                onClick={this.deleteTask}
              >
                deleteTask
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
        {tasks}
      </div>
    );
  }
}

export default Todo;
