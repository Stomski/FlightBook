const CREATE_FLIGHT = "flights/create";

const createFlight = (flight) => ({
  type: CREATE_FLIGHT,
  payload: flight,
});

export const createFlightThunk = (flight) => async (dispatch) => {
  const response = await fetch("api/flights/new", {
    method: "POST",

    body: flight,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createFlight(data));
    return data;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

function flightsReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default flightsReducer;
