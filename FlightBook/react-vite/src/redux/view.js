const SET_FEED_COMPONENT = "view/setFeedComponent";

export const setFeedComponent = (componentName) => ({
  type: SET_FEED_COMPONENT,
  payload: componentName,
});

function viewReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case SET_FEED_COMPONENT:
      newState = { ...state };
      newState["feedComponentName"] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default viewReducer;
