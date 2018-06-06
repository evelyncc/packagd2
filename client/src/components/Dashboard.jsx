import React, { Component } from 'react';
import axios from 'axios';
import AddTracking from './AddTracking';
import Label from './Label';
import Tracking from './Tracking';
import Output from './Output';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      trackingNumbers: [],
      output: '',
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddNumber = this.handleAddNumber.bind(this);
    this.getNumbers = this.getNumbers.bind(this);
  }

  componentDidMount() {
    this.getNumbers();
  }

  getNumbers() {
    axios.get('/tracking')
      .then(({ data }) => {
        const numbers = [];
        for (let index = 0; index < data.length; index++) {
          numbers.push(data[index].trackingNumber);
        }
        this.setState({ trackingNumbers: numbers });
      })
  }

  findCarrier(number) {
    let tracking = number.split(' ').join('');
    if (tracking.slice(0, 2) === '1Z' || tracking.slice(0, 2) === '1z') {
      return 'UPS';
    } else if (tracking.length >= 20 && tracking.length <= 26) {
      return 'USPS';
    } else if (tracking.length === 13) {
      return 'USPS Express';
    } else {
      return 'Not Found';
    }
  }

  handleAddNumber(number) {
    const carrier = this.findCarrier(number);
    const params = {
      username: 'evelyn',
      trackingNumber: number,
      carrier,
    };
    axios.post('/add', params);
    const newNumbers = this.state.trackingNumbers.slice();
    newNumbers.push(number);
    this.setState({ trackingNumbers: newNumbers });
  }

  handleAdd(text) {
    this.callGoogle(text);
  }

  renderNumbers() {
    if (this.state.trackingNumbers.length > 0) {
      return (
        <div>
          {this.state.trackingNumbers.map((item) => {
            return (
              <Tracking number={item} key={item} />
            );
          })}
        </div>
      );
    }
    return (
      <div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <AddTracking handleAddNumber={this.handleAddNumber} />
        <h2>Tracking info:</h2>
        {this.renderNumbers()}
        <Label handleAdd={this.handleAdd} />
        <Output output={this.state.output} />
      </div>
    )
  }
}

export default Dashboard;
