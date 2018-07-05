import React, { Component } from 'react';
import axios from 'axios';
import TrackingListContainer from '../container/trackingListContainer';
import AddTracking from './AddTracking';
import Label from './Label';
import Output from './Output';
import GOOGLE_API_KEY from '../config/google';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.parseLabel = this.parseLabel.bind(this);
    this.handleAddNumber = this.handleAddNumber.bind(this);
  }

  componentDidMount() {
    axios.get('/tracking')
      .then(({ data }) => {
        const trackingList = [];
        for (let index = 0; index < data.length; index += 1) {
          trackingList.push(data[index].trackingNumber);
        }
        this.props.handleChangeTrackingList(trackingList);
      })
      .catch(error => console.log(error));
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
    const newNumbers = this.state.trackingList.slice();
    newNumbers.push(number);
    this.setState({ trackingList: newNumbers });
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
              {/* <Output output={this.state.output} handleAddNumber={this.handleAddNumber} /> */}
            </div>
          </div>
          <div className="col">
            <div className="item">
              <TrackingListContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
