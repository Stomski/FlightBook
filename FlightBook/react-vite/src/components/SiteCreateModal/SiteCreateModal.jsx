import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSiteThunk } from "../../redux/sites"; // You'll need to create this thunk
import "./SiteCreateModal.css";

function SiteCreateModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [altitude, setAltitude] = useState("");
  const [intro, setIntro] = useState("");
  const [official, setOfficial] = useState(false);
  const [sitePhoto, setSitePhoto] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (sitePhoto !== "") {
      formData.append("site_photo", sitePhoto);
    }
    formData.append("name", name);
    formData.append("lat", lat);
    formData.append("lon", lon);
    formData.append("altitude", altitude);
    formData.append("intro", intro);
    formData.append("official", official);
    formData.append("user_id", sessionUser.id);

    const serverResponse = await dispatch(createSiteThunk(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form-modal">
      <h1>Create Site</h1>
      <p>(map input in development :)</p>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Site Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
          Latitude
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        {errors.lat && <p>{errors.lat}</p>}
        <label>
          Longitude
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </label>
        {errors.lon && <p>{errors.lon}</p>}
        <label>
          Altitude
          <input
            type="number"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
          />
        </label>
        {errors.altitude && <p>{errors.altitude}</p>}
        <label>
          Site Intro
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
          />
        </label>
        {errors.intro && <p>{errors.intro}</p>}
        <label>
          Upload Site Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSitePhoto(e.target.files[0])}
          />
        </label>
        {errors.sitePhoto && <p>{errors.sitePhoto}</p>}
        <button type="submit">Create Site</button>
      </form>
    </div>
  );
}

export default SiteCreateModal;
