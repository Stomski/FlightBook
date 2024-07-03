import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateReviewThunk } from "../../redux/reviews";
import "./ReviewUpdateModal.css";

function ReviewUpdateModal({ review }) {
  const dispatch = useDispatch();

  const [currReview, setCurrReview] = useState(review.review);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    console.log("TOP review update modal handle submit");

    if (isSubmitting) return;

    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("review", currReview);
    formData.append("user_id", sessionUser.id);
    console.log(
      "form data in the review update modal handle submit>>>",
      formData
    );

    const serverResponse = await dispatch(
      updateReviewThunk(formData, review["id"])
    );

    if (serverResponse) {
      console.log(
        "server response conditional triggered in the review update modal handle submit"
      );
      setIsSubmitting(false);
      setErrors(serverResponse);
    } else {
      // closeModal();
      console.log(
        "else condit triggered in the review update modal handle submit"
      );

      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-update-modal">
      <h1>Update Review</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="log" className="form-label">
          <textarea
            id="review"
            value={currReview}
            onChange={(e) => setLog(e.target.value)}
            required
            className="text-area"
          />
        </label>
        <div className="form-errors">{errors.review}</div>

        {errors.server}

        <div
          className={`submit-button clickable ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Update Review"}
        </div>
      </form>
    </div>
  );
}

export default ReviewUpdateModal;
