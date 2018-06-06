import React from 'react';
import moment from 'moment';

const TrackingSummary = ({ activity, index }) => {
  const renderStatus = () => {
    if (index === 0) {
      return (
        <h3>
          {activity.Status.Description}, {moment(activity.Date).format('MMM Do YYYY')}, 
          {Object.keys(activity.ActivityLocation.Address).map((address) => activity.ActivityLocation.Address[address]).join(', ')}
        </h3>
      );
    }
    return (
      <p>
        {activity.Status.Description}, {moment(activity.Date).format('MMM Do YYYY')}, 
        {Object.keys(activity.ActivityLocation.Address).map((address) => activity.ActivityLocation.Address[address]).join(', ')}
      </p>
    );
  };

  return (
    <div>
      {renderStatus()}
    </div>
  );
};

export default TrackingSummary;
