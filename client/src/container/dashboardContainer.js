import { connect } from 'react-redux';
import Dashboard from './../components/Dashboard';
import getTrackingList from '../actions/dashboard';
import changeTrackingList from '../actions/trackingList';

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetTrackingList: () => dispatch(getTrackingList()),
    handleChangeTrackingList: e => dispatch(changeTrackingList(e)),
  };
};

const DashboardContainer = connect(null, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
