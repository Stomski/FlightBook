import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteFlightThunk } from "../../redux/flights";
import { useState } from "react";
import "./FlightDeleteModal.css";

function FlightDeleteModal({ flight }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(deleteFlightThunk(flight.id));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="delete-flight-modal">
      {errors.server && <p>{errors.server}</p>}

      <div className="top">
        <h2>Delete Flight</h2>
        <p>Are you sure you want to delete this flight?</p>
        <div className="flight-display">
          <i className="fa-solid fa-plane"></i>
          {flight.site_name}
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

export default FlightDeleteModal;
