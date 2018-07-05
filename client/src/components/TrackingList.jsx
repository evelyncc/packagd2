import React from 'react';
import Tracking from './Tracking';

const TrackingList = ({ trackingList }) => {
  return (
    <div>
      <table width="100%">
        <tbody>
          <tr>
            <th>Tracking Number</th>
            <th>Carrier</th>
            <th>Status</th>
          </tr>
          {trackingList.map((item) => {
            return (
              <Tracking number={item} key={item} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingList;
