import React, { Component } from 'react';
import axios from 'axios';
import TrackingSummary from './TrackingSummary';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };

    this.determineTracker = this.determineTracker.bind(this);
    this.findUSPSStatus = this.findUSPSStatus.bind(this);
    this.findUPSStatus = this.findUPSStatus.bind(this);
    this.findUSPSStatus = this.findUSPSStatus.bind(this);
    this.parseUSPS = this.parseUSPS.bind(this);    
    this.parseUPS = this.parseUPS.bind(this);    
    this.parseTrackingData = this.parseTrackingData.bind(this);    
  }

  componentDidMount() {
    this.determineTracker();
  }


  determineTracker() {
    const { carrier, number } = this.props;
    if (carrier === 'UPS') {
      this.findUPSStatus(number);
    }
    if (carrier === 'USPS') {
      this.findUSPSStatus(number);
    }
  }

  findUSPSStatus(number) {
    axios.post(`http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="113HACKR6318"><TrackID ID="${number}"></TrackID></TrackRequest>`)
      .then((result) => {
        this.setState({ status: result.data });
      });
  }

  findUPSStatus(number) {
    const params = { 
      params: {
        trackingNumber: number,
      },
    };

    axios.get('http://localhost:5001/ups', params)
      .then((result) => {
        this.setState({ status: result.data });
      });
  }

  parseUSPS() {
    const { status } = this.state;
    const { number } = this.props;
    const startIndex = 71 + number.length;
    const data = status.slice(startIndex, status.length - 28).split('TrackSummary').join('h3').split('TrackDetail').join('p');
    return (
      <div dangerouslySetInnerHTML={{ __html: data }} />
    );
  }

  parseUPS() {
    const { status } = this.state;
    return (
      <div>
        {status.map((activity, index) =>
          <TrackingSummary activity={activity} index={index} key={activity.Status.Description} />)}
      </div>
    );
  }

  parseTrackingData() {
    const { status } = this.state;
    const { carrier } = this.props;
    if (status.length > 0) {
      if (carrier === 'USPS') {
        return (
          <div>
          {this.parseUSPS()}
          </div>
        );
      }
      if (carrier === 'UPS') {
        return (
          <div>
          {this.parseUPS()}
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
        {this.parseTrackingData()}
      </div>
    )
  }
}

export default Status;
