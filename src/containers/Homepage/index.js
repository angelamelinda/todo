import React, { Component } from "react";

import ListTask from "../../components/ListTask";
import AddTask from "../../components/AddTask";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataEdit: {}
    };
    this.edit = this.edit.bind(this);
  }
  edit(data) {
    this.setState({
      dataEdit: data
    });
  }
  render() {
    return (
      <React.Fragment>
        <AddTask dataEdit={this.state.dataEdit} />
        <ListTask edit={this.edit} />
      </React.Fragment>
    );
  }
}

export default Homepage;
