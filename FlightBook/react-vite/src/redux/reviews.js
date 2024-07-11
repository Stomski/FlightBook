const GET_REVIEWS_BY_SITE = "reviews/getBySite";
const CREATE_REVIEW_BY_SITE = "reviews/createBySite";
const DELETE_REVIEW_BY_ID = "reviews/deleteById";
const UPDATE_REVIEW_BY_ID = "reviews/updateById";

const updateReview = (review) => ({
  type: UPDATE_REVIEW_BY_ID,
  payload: review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW_BY_ID,
  payload: reviewId,
});

const createReview = (review) => ({
  type: CREATE_REVIEW_BY_SITE,
  payload: review,
});

const getReviewsBySite = (reviews) => ({
  type: GET_REVIEWS_BY_SITE,
  payload: reviews,
});

export const updateReviewThunk =
  (review, reviewId, sessionUser) => async (dispatch) => {
    // console.log("update review thunk above the fetch");

    const response = await fetch(`/api/sites/reviews/update/${reviewId}`, {
      method: "POST",
      body: review,
    });

    if (response.ok) {
      // console.log(
      //   "RESPONSE OK IN REVIEW UPDATE THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      // );
      const data = await response.json();

      // console.log(
      //   data,
      //   " REVIEW UPDATE THUNK data in response ok<<<<<<<<<<<<<<<<<<<<<"
      // );
      data["creator"] = sessionUser;
      dispatch(updateReview(data));
    } else if (response.status < 500) {
      // console.log(
      //   "RESPPONSE NOT OK LESS THAN 500 REVIEW UPDATE  THUNK?????????????????????????????????????????????????????????????????????????????????????"
      // );

      const errorMessages = await response.json();
      return errorMessages;
    } else {
      // console.log(
      //   "RESPPONSE BAD GREAATER THAN 500 REVIEW UPDATE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
      // );
      return { server: "Something went wrong. Please try again" };
    }
  };

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  // console.log("delete review thunk above the fetch");
  const response = await fetch(`/api/sites/reviews/delete/${reviewId}`);

  if (response.ok) {
    // console.log(
    //   "RESPONSE OK IN REVIEW DELETE THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    // );
    const data = await response.json();

    // console.log(
    //   data,
    //   " REVIEW DELETE THUNK data in response ok<<<<<<<<<<<<<<<<<<<<<"
    // );
    dispatch(deleteReview(reviewId));
  } else if (response.status < 500) {
    // console.log(
    //   "RESPPONSE NOT OK LESS THAN 500 REVIEW DELETE  THUNK?????????????????????????????????????????????????????????????????????????????????????"
    // );

    const errorMessages = await response.json();
    return errorMessages;
  } else {
    // console.log(
    //   "RESPPONSE BAD GREAATER THAN 500 REVIEW DELETE THUNK ?????????????????????????????????????????????????????????????????????????????????????"
    // );
    return { server: "Something went wrong. Please try again" };
  }
};

export const createReviewThunk =
  (review, siteId, creator) => async (dispatch) => {
    // console.log("CREATE REVIEW THUNK BEFORE FETCH");

    // console.log("this is the incoming review in thunk>>>>>>>", review, siteId);

    const response = await fetch(`/api/sites/reviews/create/${siteId}`, {
      method: "POST",
      body: review,
    });

    if (response.ok) {
      // console.log(
      //   "RESPONSE OK IN REVIEW CREATE  THUNK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      // );
      const data = await response.json();

      // console.log(data, "data in response ok<<<<<<<<<<<<<<<<<<<<<");
      data["creator"] = creator;
      dispatch(createReview(data));
    } else if (response.status < 500) {
      // console.log(
      //   "RESPPONSE NOT OK LESS THAN 500REVIEW CREATE  THUNK?????????????????????????????????????????????????????????????????????????????????????"
      // );

      const errorMessages = await response.json();
      return errorMessages;
    } else {
      // console.log(
      //   "RESPPONSE BAD GREAATER THAN 500 create review THUNK ?????????????????????????????????????????????????????????????????????????????????????"
      // );
      return { server: "Something went wrong. Please try again" };
    }
  };

export const getReviewsBySiteThunk = (siteId) => async (dispatch) => {
  // console.log(
  //   "GET REVIEWSS BY SITE GET REVIEWSS BY SITE GET REVIEWSS BY SITE > BEFORE FETCH"
  // );
  // console.log(
  //   siteId,
  //   "SiTE id   <<<<<<<<<<<<<<<<<<< in the get review by site thunk"
  // );
  const response = await fetch(`/api/sites/reviews/${siteId}`);
  if (response.ok) {
    // console.log(
    //   "#####################################################GET REVIEWSS BY SITE GET REVIEWSS BY SITE GET REVIEWSS BY SITE > RESPONSE OK"
    // );
    const data = await response.json();
    // console.log(
    //   data,
    //   "data<<<<<<<<<<<<< get reviews by site thunk respons to json"
    // );
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
    case UPDATE_REVIEW_BY_ID:
      newState = { ...state };
      newState[action.payload["id"]] = action.payload;
      return newState;
    case DELETE_REVIEW_BY_ID:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
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
