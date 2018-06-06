const { getTrackingInfo, saveTrackingInfo } = require('./queries');
const { findUPSStatus, findUSPSStatus } = require('./apicalls');

const handleUPSRequest = (request, response) => {
  findUPSStatus(request.query.trackingNumber)
    .then((result) => {
      response.send(result.data.TrackResponse.Shipment.Package.Activity);
    })
    .catch(error => response.send(error));
};

const handleUSPSRequest = (request, response) => {
  findUSPSStatus(request.query.trackingNumber)
    .then((result) => {
      response.send(result);
    })
    .catch(error => response.send(error));
};

const handleTrackingRequest = (request, response) => {
  getTrackingInfo()
    .then((results) => {
      const parsedResults = results.rows.map((result) => {
        const data = {
          id: result.id,
          username: result.username,
          trackingNumber: result.tracking_number,
          carrier: result.postal_carrier,
        };
        return data;
      });
      response.send(parsedResults);
    })
    .catch(error => console.error(error));
};

const handleAddTracking = (request, response) => {
  saveTrackingInfo(request.body)
    .then(() => {
      response.send('Save successful!');
    })
    .catch(() => {
      response.send('Save unsuccessful.');
    });
};

module.exports = {
  handleUPSRequest,
  handleUSPSRequest,
  handleAddTracking,
  handleTrackingRequest,
};
