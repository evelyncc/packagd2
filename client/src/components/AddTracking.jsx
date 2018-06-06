import React, { Component } from 'react';

class AddTracking extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  getInput(event) {
    this.setState({ label: event.target.value});
  }

  render() {
    const { handleAddNumber } = this.props;
    return (
      <div>
        <h2>Deliveries:</h2>
        <input type="text" className="label" size="40" placeholder="Enter tracking number here" onChange={(value) => this.getInput(value)} />
        <button onClick={() => handleAddNumber(this.state.label)} >Add</button>
      </div>
    );
  }
}

export default AddTracking;
