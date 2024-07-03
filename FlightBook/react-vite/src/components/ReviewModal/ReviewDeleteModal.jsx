import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { deleteReviewThunk } from "../../redux/sites";
import { setFeedComponent } from "../../redux/view";
import { useState } from "react";
import "./ReviewDeleteModal.css";

function ReviewDeleteModal(review) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const serverResponse = await dispatch(deleteSiteThunk(site.id));

    if (serverResponse) {
      // setErrors(serverResponse);
    } else {
      closeModal();
      // dispatch(setFeedComponent("FeedMySites"));
    }
  };

  return (
    <div className="delete-Review-modal">
      {errors.server && <p>{errors.server}</p>}

      <div className="top">
        <h2>Delete Review</h2>
        <p>Are you sure you want to delete this Review?</p>
        <div className="Review-display"></div>
        <p>This action cannot be undone.</p>
      </div>
      <div className="button-container">
        <button onClick={closeModal} className="cancel-button">
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReviewDeleteModal;
