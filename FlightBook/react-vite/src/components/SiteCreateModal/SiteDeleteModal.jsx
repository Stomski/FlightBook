import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSiteThunk } from "../../redux/sites";
import { setFeedComponent } from "../../redux/view";
import { useState } from "react";
import "./SiteDeleteModal.css";

function SiteDeleteModal({ site, socket }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(deleteSiteThunk(site.id));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      dispatch(setFeedComponent("FeedMySites"));
    }
  };

  return (
    <div className="delete-site-modal">
      {errors.server && <p>{errors.server}</p>}

      <div className="top">
        <h2>Delete Site</h2>
        <p>Are you sure you want to delete this site?</p>
        <div className="site-display">
          <i className="fa-solid fa-location-dot"></i>
          {site.name}
        </div>
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

export default SiteDeleteModal;
