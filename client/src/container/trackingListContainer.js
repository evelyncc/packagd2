import { connect } from 'react-redux';
import TrackingList from './../components/TrackingList';
import changeTrackingList from '../actions/trackingList';

const mapStateToProps = (state) => {
  return {
    trackingList: state.trackingList,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleTrackingListClick: () => dispatch(changeTrackingList()),
//   };
// };
const TrackingListContainer = connect(mapStateToProps)(TrackingList);

export default TrackingListContainer;
