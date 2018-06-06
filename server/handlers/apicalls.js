const axios = require('axios')

const findUPSStatus = async (trackingNumber) => {
  const params = {
    UPSSecurity: {
      ServiceAccessToken: {
        AccessLicenseNumber: '7D45CAF2EE3987E8',
      },
    },
    TrackRequest: {
      Request: {
        RequestOption: '1',
      },
      InquiryNumber: trackingNumber,
    },
  };

  return await axios.post('https://onlinetools.ups.com/rest/Track', params);
};

const findUSPSStatus = async (trackingNumber) => {
  return await axios.post(`http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="113HACKR6318"><TrackID ID="${trackingNumber}"></TrackID></TrackRequest>`);
};

module.exports = {
  findUPSStatus,
  findUSPSStatus,
};

