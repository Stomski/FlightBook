import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../redux/reviews";

import "./ReviewCreateModal.css";

function ReviewCreateModal(site) {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");

  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("TOP OF THE HANDLE SUBMIT IN THE REVIEW CREATE COMPONENT");

    if (isSubmitting) {
      // console.log("isSubmitting conditional triggered");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("review", review);

    formData.append("creator_id", sessionUser.id);
    formData.append("site_id", site.site["id"]);

    const serverResponse = await dispatch(
      createReviewThunk(formData, site.site["id"], sessionUser)
    );

    setIsSubmitting(false);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="site-create-modal">
      <h1>Review {site.site.name}</h1>

      {/* {errors.server && <p className="form-errors">{errors.server}</p>} */}
      <div className="form-errors">{errors.server}</div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          tell us about your experience!
          <textarea
            value={review}
            className="text-area"
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.review}</div>

        <div
          className={`submit-button clickable ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Create Review"}
        </div>
      </form>
    </div>
  );
}

export default ReviewCreateModal;
