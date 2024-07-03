import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewUpdateModal.css";

function ReviewUpdateModal({ review }) {
  const dispatch = useDispatch();

  const [currReview, setCurrReview] = useState(review.review);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("review", currReview);
    formData.append("user_id", sessionUser.id);

    const serverResponse = await dispatch();

    if (serverResponse) {
      setIsSubmitting(false);
      setErrors(serverResponse);
    } else {
      closeModal();
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
