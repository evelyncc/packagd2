import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import trackingDashboard from './reducers/main';
import DashboardContainer from './container/dashboardContainer';
import Dashboard from './components/Dashboard';

const store = createStore(trackingDashboard);

ReactDOM.render(
  <Provider store={store}>
    <DashboardContainer />
  </Provider>, 
  document.getElementById('app'));
