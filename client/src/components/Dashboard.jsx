import React, { Component } from 'react';
import axios from 'axios';
import AddTracking from './AddTracking';
import Label from './Label';
import Tracking from './Tracking';
import Output from './Output';
import GOOGLE_API_KEY from '../config/google';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      trackingNumbers: [],
      output: '',
    };

    this.parseLabel = this.parseLabel.bind(this);
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
        for (let index = 0; index < data.length; index += 1) {
          numbers.push(data[index].trackingNumber);
        }
        this.setState({ trackingNumbers: numbers });
      });
  }

  parseLabel(imageURL) {
    const body = {
      requests: [
        {
          image: {
            source: {
              imageUri: imageURL,
            },
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 1,
            },
          ],
        },
      ],
    };
    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`, body)
      .then((response) => {
        const parsedResponse = response.data.responses[0].fullTextAnnotation.text.split('\n')[7].split(' ').join('');
        this.setState({ output: parsedResponse });
      });
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

  renderNumbers() {
    if (this.state.trackingNumbers.length > 0) {
      return (
        <div>
        <table width="100%">
          <tbody>
        <tr>
          <th>Tracking Number</th>
          <th>Carrier</th>
          <th>Status</th>
        </tr>
          {this.state.trackingNumbers.map((item) => {
            return (
              <Tracking number={item} key={item} />
            );
          })}
          </tbody>
          </table>
        </div>
      );
    }
    return (
      <div />
    );
  }

  render() {
    return (
      <div>
        <div className="header">
          <span className="fa fa-envelope-o fa_custom" /> Packagd
          

        </div>
        <div className="container">
          <div className="col">
            <div className="item">
              <AddTracking handleAddNumber={this.handleAddNumber} />
            </div>
            <div className="item">
              <Label parseLabel={this.parseLabel} />
              <Output output={this.state.output} handleAddNumber={this.handleAddNumber} />
            </div>
          </div>
          <div className="col">
            <div className="item">
              {this.renderNumbers()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
