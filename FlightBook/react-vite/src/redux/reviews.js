const GET_REVIEWS_BY_SITE = "reviews/getBySite";
const CREATE_REVIEW_BY_SITE = "reviews/createBySite";

const createReview = (review) => ({
  type: CREATE_REVIEW_BY_SITE,
  payload: review,
});

const getReviewsBySite = (reviews) => ({
  type: GET_REVIEWS_BY_SITE,
  payload: reviews,
});

export const createReviewThunk = (review, siteId) => async (dispatch) => {
  console.log("CREATE REVIEW THUNK BEFORE FETCH");

  console.log("this is the incoming review in thunk>>>>>>>", review, siteId);

  const response = await fetch(`/api/sites/reviews/create/${siteId}`, {
    method: "POST",
    body: review,
  });

  if (response.ok) {
    console.log(
      "RESPONSE OK IN REVIEW CREATE  THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    const data = await response.json();

    console.log(data, "data in response ok<<<<<<<<<<<<<<<<<<<<<");
    dispatch(createReview(data));
    // dispatch(createSite(data));
  } else if (response.status < 500) {
    console.log(
      "RESPPONSE NOT OK LESS THAN 500REVIEW CREATE  THUNK?????????????????????????????????????????????????????????????????????????????????????"
    );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    console.log(
      "RESPPONSE BAD GREAATER THAN 500 create review THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    );
    return { server: "Something went wrong. Please try again" };
  }
};

export const getReviewsBySiteThunk = (siteId) => async (dispatch) => {
  console.log(
    "GET REVIEWSS BY SITE GET REVIEWSS BY SITE GET REVIEWSS BY SITE > BEFORE FETCH"
  );
  console.log(siteId, "SiTE id   <<<<<<<<<<<<<<<<<<<");
  const response = await fetch(`/api/sites/reviews/${siteId}`);
  if (response.ok) {
    console.log(
      "#####################################################GET REVIEWSS BY SITE GET REVIEWSS BY SITE GET REVIEWSS BY SITE > RESPONSE OK"
    );
    const data = await response.json();
    console.log(data, "data<<<<<<<<<<<<<,");
    dispatch(getReviewsBySite(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

function reviewReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case CREATE_REVIEW_BY_SITE:
      newState = { ...state };
      newState[action.payload["id"]] = action.payload;
      return newState;
    case GET_REVIEWS_BY_SITE:
      newState = { ...action.payload };
      return newState;
    default:
      return state;
  }
}

export default reviewReducer;
