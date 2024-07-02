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

  const response = await fetch(`/api/sites/reviews/create/${siteId}`);
  console.log("CREATE REVIEW THUNK after FETCH");
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
    case GET_REVIEWS_BY_SITE:
      newState = { ...action.payload };
      return newState;
    default:
      return state;
  }
}

export default reviewReducer;
