const trackingListReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_TRACKING_LIST':
      return action.trackingList;
    default:
      return state;
  }
};

export default trackingListReducer;
