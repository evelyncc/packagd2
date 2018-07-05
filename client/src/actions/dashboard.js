import axios from 'axios';
import changeTrackingList from './trackingList';

const getTrackingList = () => {
  return (dispatch) => {
    axios.get('http://localhost:5001/tracking')
      .then(({ data }) => {
        const trackingList = [];
        for (let index = 0; index < data.length; index += 1) {
          trackingList.push(data[index].trackingNumber);
        }
        dispatch(changeTrackingList(trackingList));
      })
      .catch(error => console.log(error));
  };
};

export default getTrackingList;
