import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createFlightThunk } from "../../redux/flights";
import { getAllSitesThunk, getSiteDetailsThunk } from "../../redux/sites";
import Select from "react-select";
import "./FlightCreateModal.css";

function FlightCreateModal() {
  const dispatch = useDispatch();
  const [siteName, setSiteName] = useState("");
  const [length, setLength] = useState("");
  const [startTime, setStartTime] = useState("");
  const [equipment, setEquipment] = useState("");
  const [log, setLog] = useState("");
  const [weather, setWeather] = useState("");
  const [flightPhoto, setFlightPhoto] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const sites = useSelector((state) => state.sites);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allSites = {};
  Object.entries(sites).forEach((set) => {
    if (!isNaN(parseFloat(set[0]))) {
      allSites[set[1]["id"]] = set[1];
    }
  });

  useEffect(() => {
    dispatch(getAllSitesThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    setErrors({});
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData();
    if (flightPhoto !== "") {
      formData.append("flight_photo", flightPhoto);
    }
    formData.append("site_name", siteName.name);
    formData.append("length", length);
    formData.append("start_time", startTime);
    formData.append("equipment", equipment);
    formData.append("log", log);
    formData.append("user_id", sessionUser.id);
    formData.append("site_id", siteName.id);

    const serverResponse = await dispatch(createFlightThunk(formData));
    setIsSubmitting(false);
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleSiteChange = (selectedOption) => {
    setSiteName(selectedOption ? selectedOption.value : "");
  };

  const siteOptions = Object.values(allSites).map((site) => ({
    value: site,
    label: site.name,
  }));

  return (
    <div className="flight-create-modal">
      <h1>Log a Flight!</h1>
      {errors.server && <p className="form-errors">{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Site Name
          <Select
            options={siteOptions}
            onChange={handleSiteChange}
            isClearable
            placeholder="Select site..."
          />
        </label>
        <div className="form-errors">{errors.siteName}</div>

        <label>
          Length (in minutes)
          <input
            type="text"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.length}</div>

        <label>
          Start Time
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.startTime}</div>

        <label>
          Equipment
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </label>
        <div className="form-errors">{errors.equipment}</div>

        <label>
          Log
          <textarea
            value={log}
            onChange={(e) => setLog(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.log}</div>

        <label>
          Upload Flight Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFlightPhoto(e.target.files[0])}
          />
        </label>
        <div className="form-errors">{errors.flightPhoto}</div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Flight"}
        </button>
      </form>
    </div>
  );
}

export default FlightCreateModal;
