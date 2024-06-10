import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateFlightThunk } from "../../redux/flights";
import "./FlightUpdateModal.css";

function FlightUpdateModal({ flight }) {
  const startTimeFromDB = flight.start_time;
  // Convert the startTime to a Date object
  const startTimeDate = new Date(startTimeFromDB);
  // Format the Date object to the format accepted by datetime-local input
  const formattedStartTime = startTimeDate.toISOString().slice(0, 16);

  const dispatch = useDispatch();
  const [siteName, setSiteName] = useState(flight.site_name);
  const [length, setLength] = useState(flight.length);
  const [startTime, setStartTime] = useState(formattedStartTime);
  const [equipment, setEquipment] = useState(flight.equipment);
  const [log, setLog] = useState(flight.log);
  const [flightPhoto, setFlightPhoto] = useState("");
  const [imageURL, setImageURL] = useState(flight.flight_photo || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setErrors({
        ...errors,
        flightPhoto: "Selected image exceeds the maximum file size of 5Mb",
      });
      return;
    }

    const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);

    setFlightPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData();
    if (flightPhoto !== "") {
      formData.append("flight_photo", flightPhoto);
    }
    formData.append("site_name", siteName);
    formData.append("length", length);
    formData.append("start_time", startTime);
    formData.append("equipment", equipment);
    formData.append("log", log);

    formData.append("user_id", sessionUser.id);

    const serverResponse = await dispatch(
      updateFlightThunk(flight.id, formData)
    );

    if (serverResponse) {
      setIsSubmitting(false);
      setErrors(serverResponse);
    } else {
      closeModal();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flight-update-modal">
      <h1>Update Flight</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="site-name">{flight.site_name}</h2>

        <label htmlFor="length" className="form-label">
          Length (in minutes)
          <input
            id="length"
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <div className="form-errors">{errors.length}</div>

        <label htmlFor="start-time" className="form-label">
          Start Time
          <input
            id="start-time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <div className="form-errors">{errors.startTime}</div>

        <label htmlFor="equipment" className="form-label">
          Equipment
          <input
            id="equipment"
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="form-input"
          />
        </label>
        <div className="form-errors">{errors.equipment}</div>

        <label htmlFor="log" className="form-label">
          Log
          <textarea
            id="log"
            value={log}
            onChange={(e) => setLog(e.target.value)}
            required
            className="text-area"
          />
        </label>
        <div className="form-errors">{errors.log}</div>

        <label className="form-label">
          Upload Flight Photo
          <div className="file-inputs-container">
            <img src={imageURL} alt="Flight" className="thumbnails-noname" />
            <h4 className="file-input-labels clickable">Upload a photo</h4>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="post-image-input"
              onChange={fileWrap}
              className="form-input"
            />
          </div>
        </label>
        <div className="form-errors">
          {errors.flightPhoto}
          {errors.server}
        </div>

        <div
          className={`submit-button clickable ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Update Flight"}
        </div>
      </form>
    </div>
  );
}

export default FlightUpdateModal;
