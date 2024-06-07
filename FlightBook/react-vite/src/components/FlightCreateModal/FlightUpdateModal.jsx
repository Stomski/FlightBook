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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

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

  return (
    <div className="flight-update-modal">
      <h1>Update Flight</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Site Name
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
        </label>
        {errors.siteName && <p>{errors.siteName}</p>}
        <label>
          Length (in minutes)
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
          />
        </label>
        {errors.length && <p>{errors.length}</p>}
        <label>
          Start Time
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        {errors.startTime && <p>{errors.startTime}</p>}
        <label>
          Equipment
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </label>
        {errors.equipment && <p>{errors.equipment}</p>}
        <label>
          Log
          <textarea
            value={log}
            onChange={(e) => setLog(e.target.value)}
            required
          />
        </label>
        {errors.log && <p>{errors.log}</p>}

        <label>
          Upload Flight Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFlightPhoto(e.target.files[0])}
          />
        </label>
        {errors.flightPhoto && <p>{errors.flightPhoto}</p>}
        <button type="submit">Update Flight</button>
      </form>
    </div>
  );
}

export default FlightUpdateModal;
