import React, { Component } from 'react';

class Label extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  getInput(event) {
    this.setState({ label: event.target.value });
  }

  render() {
    const { handleAdd } = this.props;
    return (
      <div>
        <h2>Upload Label:</h2>
        <input type="text" className="label" size="40" placeholder="Enter image URL here" onChange={value => this.getInput(value)} />
        <button onClick={() => handleAdd(this.state.label)} >Add</button>
      </div>
    );
  }
}

export default Label;
