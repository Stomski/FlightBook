const GET_ALL_SITES = "sites/getAll";
const CREATE_SITE = "sites/new";
const GET_MY_SITES = "sites/mine";
const UPDATE_SITE = "sites/update";
const DELETE_SITE = "sites/delete";
const GET_SITE_DETAILS = "sites/detailView";

const getSiteDetails = (siteDetails) => ({
  type: GET_SITE_DETAILS,
  payload: siteDetails,
});

const deleteSite = (site) => ({
  type: DELETE_SITE,
  payload: site,
});

const updateSite = (site) => ({
  type: UPDATE_SITE,
  payload: site,
});

const getMySites = (sites) => ({
  type: GET_MY_SITES,
  payload: sites,
});

const createSite = (site) => ({
  type: CREATE_SITE,
  payload: site,
});

const getAllSites = (sites) => ({
  type: GET_ALL_SITES,
  payload: sites,
});

export const getSiteDetailsThunk = (siteId) => async (dispatch) => {
  console.log(
    "I THINK THIS IS GETTING CALLED< GET SITRE DETAILS > BEFORE FETCH"
  );

  const response = await fetch(`/api/sites/details/${siteId}`);
  if (response.ok) {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET SITE DETAILS THUNK > RESPONSE OK"
    );
    const data = await response.json();
    dispatch(getSiteDetails(data));
  } else if (response.status < 500) {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET SITE DETAILS THUNK > err less 500"
    );
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET SITE DETAILS THUNK greater 500"
    );
    return { server: "Something went wrong. Please try again" };
  }
};

export const deleteSiteThunk = (siteId) => async (dispatch) => {
  console.log(
    " THIS IS GETTING CALLED< Delete DELETE SITES THUNK > BEFORE FETCH"
  );

  const response = await fetch(`/api/sites/delete/${siteId}`);

  if (response.ok) {
    console.log("I THINK THIS IS GETTING CALLED< DELETE > RESPONSE OK");
    const data = await response.json();
    dispatch(deleteSite(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const updateSiteThunk = (siteId, site) => async (dispatch) => {
  console.log(" THIS IS GETTING CALLED< UPDATE SITES THUNK > BEFORE FETCH");
  const response = await fetch(`/api/sites/update/${siteId}`, {
    method: "POST",
    body: site,
  });
  if (response.ok) {
    console.log(
      "RESPONSE OK IN  update SITETHUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    const data = await response.json();

    console.log(
      "%c data log in site thunjk response>",
      "color:blue; font-size: 26px",
      data
    );
    dispatch(updateSite(data));
  } else if (response.status < 500) {
    console.log(
      "RESPPONSE NOT OK LESS THAN 500 UPDATE SITE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    console.log(
      "RESPPONSE BAD GREAATER THAN 500  vUPDATE SITE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );
    return { server: "Something went wrong. Please try again" };
  }
};

export const getMySitesThunk = (userId) => async (dispatch) => {
  console.log(" THIS IS GETTING CALLED< GET MY SITES THUNK > BEFORE FETCH");

  const response = await fetch(`/api/sites/by-user/${userId}`);
  if (response.ok) {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET ALL SITES THUNK > RESPONSE OK"
    );
    const data = await response.json();
    dispatch(getAllSites(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const getAllSitesThunk = () => async (dispatch) => {
  console.log(
    "I THINK THIS IS GETTING CALLED< GET ALL SITES THUNK > BEFORE FETCH"
  );

  const response = await fetch("/api/sites/all");
  if (response.ok) {
    console.log(
      "I THINK THIS IS GETTING CALLED< GET ALL SITES THUNK > RESPONSE OK"
    );
    const data = await response.json();
    dispatch(getAllSites(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const createSiteThunk = (site) => async (dispatch) => {
  const response = await fetch("/api/sites/new", {
    method: "POST",
    body: site,
  });
  if (response.ok) {
    console.log(
      "RESPONSE OK IN  CREATE SITETHUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    const data = await response.json();
    dispatch(createSite(data));
  } else if (response.status < 500) {
    console.log(
      "RESPPONSE NOT OK LESS THAN 500 CREATSITE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    console.log(
      "RESPPONSE BAD GREAATER THAN 500  vCREATSITE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );
    return { server: "Something went wrong. Please try again" };
  }
};

function sitesReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_SITE_DETAILS:
      newState = { ...state };
      newState["detailView"] = action.payload;
      return newState;
    case UPDATE_SITE:
      newState = { ...state };
      newState[action.payload["id"]];
      return newState;
    case GET_ALL_SITES:
      newState = { ...action.payload };

      newState["detailView"] = state["detailView"];
      return newState;
    case CREATE_SITE:
      newState = { ...state };
      newState[action.payload["id"]] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default sitesReducer;
