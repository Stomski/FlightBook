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

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setFilename(maxFileError); // "Selected image exceeds the maximum file size of 5Mb"
      return;
    }

    const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);

    setFlightPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
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
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  if (imageURL === "") {
    setImageURL("../../../SMALLLOGO.png");
  }

  return (
    <div className="flight-update-modal">
      <h1>Update Flight</h1>
      {errors.server && <p className="error-message">{errors.server}</p>}
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
        {errors.length && <p className="error-message">{errors.length}</p>}
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
        {errors.startTime && (
          <p className="error-message">{errors.startTime}</p>
        )}
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
        {errors.equipment && (
          <p className="error-message">{errors.equipment}</p>
        )}
        <label htmlFor="log" className="form-label">
          Log
          <textarea
            id="log"
            value={log}
            onChange={(e) => setLog(e.target.value)}
            required
            className="form-textarea"
          />
        </label>
        {errors.log && <p className="error-message">{errors.log}</p>}

        <label className="form-label">
          Upload Flight Photo
          <div className="file-inputs-container">
            <img src={imageURL} alt="Flight" className="thumbnails-noname" />
            <a htmlFor="post-image-input" className="file-input-labels">
              Upload a photo
            </a>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="post-image-input"
              onChange={fileWrap}
              className="form-input"
            />
          </div>
        </label>
        {errors.flightPhoto && (
          <p className="error-message">{errors.flightPhoto}</p>
        )}
        <button type="submit" className="submit-button">
          Update Flight
        </button>
      </form>
    </div>
  );
}

export default FlightUpdateModal;
