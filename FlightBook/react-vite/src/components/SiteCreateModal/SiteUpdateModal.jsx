import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { updateSiteThunk } from "../../redux/sites";
import "./SiteUpdateModal.css";

function SiteUpdateModal({ site }) {
  console.log("SITE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", site);
  const dispatch = useDispatch();
  const [name, setName] = useState(site.name);
  const [lat, setLat] = useState(site.lat);
  const [lon, setLon] = useState(site.lon);
  const [altitude, setAltitude] = useState(site.altitude);
  const [intro, setIntro] = useState(site.intro);
  const [official, setOfficial] = useState(site.official);
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

    // const serverResponse = await dispatch(updateSiteThunk(site.id, formData));

    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   closeModal();
    // }
  };

  return (
    <div className="site-update-modal">
      <h1>Update Site</h1>
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
        <button type="submit">Update Site</button>
      </form>
    </div>
  );
}

export default SiteUpdateModal;
