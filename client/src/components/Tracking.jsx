import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Status from './Status';

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      carrier: '',
    };

    this.showStatus = this.showStatus.bind(this);
    this.findCarrier = this.findCarrier.bind(this);
  }

  componentDidMount() {
    this.findCarrier();
  }

  findCarrier() {
    const { number } = this.props;
    let tracking = number.split(' ').join('');
    if (tracking.slice(0, 2) === '1Z' || tracking.slice(0, 2) === '1z') {
      this.setState({ carrier: 'UPS' });
    } else if (tracking.length >= 20 && tracking.length <= 26) {
      this.setState({ carrier: 'USPS' });
    } else if (tracking.length === 13) {
      this.setState({ carrier: 'USPS Express' });
    } else {
      this.setState({ carrier: 'Not Found' });
    }
  }

  linkCarrier() {
    const { carrier } = this.state;
    const { number } = this.props;
    let url = '';
    if (carrier === 'USPS') {
      url = 'https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=';
    } else if (carrier === 'UPS') {
      url = 'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=';
    }
    return (
      <a href={`${url}${number}`} target="_blank">{carrier}</a>
    );
  }

  showStatus() {
    const status = !this.state.status;
    this.setState({ status });
  }

  renderStatus() {
    const { status, carrier } = this.state;
    const { number } = this.props;
    if (status) {
      return (
        <Modal show={status} onHide={this.showStatus}>
          <Status number={number} carrier={carrier} />
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>
        <span className="item">
          {this.props.number}
        </span>
        <span className="fa fa-truck fa_custom fa-2x" />
        <span className="item">
          {this.linkCarrier(this.props.number)}
        </span>
        <span className="item">
          <button onClick={() => this.showStatus()} >Status</button>
        </span>
        {this.renderStatus()}
      </div>
    )
  }
}

export default Tracking;
