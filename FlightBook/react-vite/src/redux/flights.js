const CREATE_FLIGHT = "flights/create";
const GET_ALL_FLIGHTS = "flights/getAll";
const GET_FLIGHTS_BY_USER = "flights/byUser";
const UPDATE_FLIGHT = "flights/update";
const DELETE_FLIGHT = "flights/delete";
const FLIGHT_DETAIL_VIEW = "flights/detailView";

const flightDetailView = (flightDetails) => ({
  type: FLIGHT_DETAIL_VIEW,
  payload: flightDetails,
});

const deleteFlight = (flight) => ({
  type: DELETE_FLIGHT,
  payload: flight,
});

const getFlightsByUser = (flights) => ({
  type: GET_FLIGHTS_BY_USER,
  payload: flights,
});

const updateFlight = (flight) => ({
  type: UPDATE_FLIGHT,
  payload: flight,
});

const getAllFlights = (flights) => ({
  type: GET_ALL_FLIGHTS,
  payload: flights,
});

const createFlight = (flight) => ({
  type: CREATE_FLIGHT,
  payload: flight,
});

export const flightDetailViewThunk = (flightId) => async (dispatch) => {
  const response = await fetch(`api/flights/detail-view/${flightId}`);
  if (response.ok) {
    const data = await response.json();
    // console.log(
    //   "%c flightDetailViewThunk response ok data log>",
    //   "color:red; font-size: 26px",
    //   data
    // );
    dispatch(flightDetailView(data));
  } else if (response.status < 500) {
    // console.log(
    //   "RESPPONSE NOT OK LESS THAN 500 FLIGHT DETAIL THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    // console.log(
    //   "RESPPONSE BAD GREAATER THAN 500  FLIGHT DETAIL THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );
    return { server: "Something went wrong. Please try again" };
  }
};

export const deleteFlightThunk = (flightId) => async (dispatch) => {
  // console.log("DKKKELETE FLIGHT THUNK CALLED SUCCESSFGULLY");

  const response = await fetch(`/api/flights/delete/${flightId}`);

  if (response.ok) {
    // console.log(
    // "RESPONSE OK IN UPDATE FLIGHT THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    // );
    const data = await response.json();
    dispatch(deleteFlight(data));
  } else if (response.status < 500) {
    // console.log(
    //   "RESPPONSE NOT OK LESS THAN 500 UPDATE FLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    // console.log(
    //   "RESPPONSE BAD GREAATER THAN 500  vUPDATE FLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );
    return { server: "Something went wrong. Please try again" };
  }
};

export const updateFlightThunk = (flightId, flight) => async (dispatch) => {
  // console.log("UPDATE FLIGHT THUNK CALLED SUCCESSFGULLY");
  const response = await fetch(`api/flights/update/${flightId}`, {
    method: "POST",

    body: flight,
  });
  if (response.ok) {
    // console.log(
    //   "RESPONSE OK IN UPDATE FLIGHT THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    // );
    const data = await response.json();
    dispatch(updateFlight(data));
  } else if (response.status < 500) {
    // console.log(
    //   "RESPPONSE NOT OK LESS THAN 500 UPDATE FLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    // console.log(
    //   "RESPPONSE BAD GREAATER THAN 500  vUPDATE FLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );
    return { server: "Something went wrong. Please try again" };
  }
};

export const getFlightsByUserThunk = (userId) => async (dispatch) => {
  // console.log(
  //   "GET FLIGHTS BY USER THUNK CALLED&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
  // );
  const response = await fetch(`/api/flights/by-user/${userId}`);
  if (response.ok) {
    // console.log("GET FLIGHTS BY USER THUNK > RESPONSE OK");
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
    // console.log(
    //   "I THINK THIS IS GETTING CALLED< GET ALL Flights THUNK > RESPONSE OK"
    // );
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
    const data = await response.json();
    // console.log(
    //   "RESPONSE OK IN CREATE FLIGHT THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    //   data
    // );
    dispatch(createFlight(data));
  } else if (response.status < 500) {
    // console.log(
    //   "RESPPONSE NOT OK LESS THAN 500 CREATFLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    // console.log(
    //   "RESPPONSE BAD GREAATER THAN 500  vCREATFLIGHT THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );
    return { server: "Something went wrong. Please try again" };
  }
};

function flightsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case FLIGHT_DETAIL_VIEW:
      newState = { ...state };
      newState["detailView"] = action.payload;
      return newState;
    case DELETE_FLIGHT:
      newState = { ...state };
      delete newState["selectedUsersFlights"][action.payload["id"]];
      delete newState[action.payload["id"]];
      return newState;
    case UPDATE_FLIGHT:
      newState = { ...state };
      newState["selectedUsersFlights"][action.payload["id"]] = action.payload;
      newState[action.payload["id"]] = action.payload;
      return newState;
    case GET_FLIGHTS_BY_USER:
      newState = { ...state };
      newState["selectedUsersFlights"] = action.payload;
      return newState;
    case GET_ALL_FLIGHTS:
      newState = { ...action.payload };
      newState["selectedUsersFlights"] = state["selectedUsersFlights"];
      newState["detailView"] = state["detailView"];
      return newState;
    case CREATE_FLIGHT:
      console.log("CREATE FLIGHT CALLED, asdfasdfasdf", action);
      newState = { ...state };
      newState[action.payload["id"]] = action.payload;
      if (newState["selectedUsersFlights"]) {
        newState["selectedUsersFlights"][action.payload["id"]] = action.payload;
      }

      return newState;
    default:
      return state;
  }
}

export default flightsReducer;
