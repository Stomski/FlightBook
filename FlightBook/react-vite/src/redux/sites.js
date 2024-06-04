const GET_ALL_SITES = "sites/getAll";
const CREATE_SITE = "sites/new";

const createSite = (site) => ({
  type: CREATE_SITE,
  payload: site,
});

const getAllSites = (sites) => ({
  type: GET_ALL_SITES,
  payload: sites,
});

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
    case GET_ALL_SITES:
      newState = { ...action.payload };
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
