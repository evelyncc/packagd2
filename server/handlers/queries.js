const db = require('../../db/index');

const getTrackingInfo = async () => {
  try {
    const query = 'SELECT * FROM tracking';
    return await db.query(query);
    // return result;
  } catch (error) {
    return error;
  }
};

const saveTrackingInfo = async ({ username, trackingNumber, carrier }) => {
  try {
    const query = `INSERT INTO tracking (username, tracking_number, postal_carrier)  
    VALUES ($1, $2, $3)`;
    const values = [username, trackingNumber, carrier];
    console.log(values)

    return await db.query(query, values);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getTrackingInfo,
  saveTrackingInfo,
};
