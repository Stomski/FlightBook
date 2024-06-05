const CREATE_FLIGHT = "flights/create";
const GET_ALL_FLIGHTS = "flights/getAll";
const GET_FLIGHTS_BY_USER = "flights/byUser";

const getFlightsByUser = (flights) => ({
  type: GET_FLIGHTS_BY_USER,
  payload: flights,
});

const getAllFlights = (flights) => ({
  type: GET_ALL_FLIGHTS,
  payload: flights,
});

const createFlight = (flight) => ({
  type: CREATE_FLIGHT,
  payload: flight,
});

export const getFlightsByUserThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/flights/by-user/${userId}`);
  if (response.ok) {
    console.log("GET FLIGHTS BY USER THUNK > RESPONSE OK");
    const data = await response.json();
    dispatch(getFlightsByUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const getAllFlightsThunk = () => async (dispatch) => {
  const response = await fetch("/api/flights/all");
  if (response.ok) {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET ALL Flights THUNK > RESPONSE OK"
    );
    const data = await response.json();
    dispatch(getAllFlights(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const createFlightThunk = (flight) => async (dispatch) => {
  const response = await fetch("api/flights/new", {
    method: "POST",

    body: flight,
  });
  if (response.ok) {
    console.log(
      "RESPONSE OK IN CREATE FLIGHT THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    const data = await response.json();
    dispatch(createFlight(data));
  } else if (response.status < 500) {
    console.log(
      "RESPPONSE NOT OK LESS THAN 500 CREATFLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    console.log(
      "RESPPONSE BAD GREAATER THAN 500  vCREATFLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );
    return { server: "Something went wrong. Please try again" };
  }
};

function flightsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_FLIGHTS_BY_USER:
      newState = { ...state };
      newstate["selectedUsersFlights"] = action.payload;
      return newState;
    case GET_ALL_FLIGHTS:
      newState = { ...action.payload };
      return newState;
    case CREATE_FLIGHT:
      newState = { ...state };
      newState[action.payload["id"]] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default flightsReducer;
