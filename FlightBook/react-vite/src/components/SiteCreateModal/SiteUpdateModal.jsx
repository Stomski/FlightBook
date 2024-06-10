import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSiteThunk } from "../../redux/sites";
import { setFeedComponent } from "../../redux/view";
import "./SiteUpdateModal.css";

function SiteUpdateModal({ site }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(site.name);
  const [lat, setLat] = useState(site.lat);
  const [lon, setLon] = useState(site.lon);
  const [altitude, setAltitude] = useState(site.altitude);
  const [intro, setIntro] = useState(site.intro);
  const [official, setOfficial] = useState(site.official);
  const [sitePhoto, setSitePhoto] = useState(site.site_photo);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageURL, setImageURL] = useState(site.site_photo);

  const handleSubmit = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
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

    const serverResponse = await dispatch(updateSiteThunk(site.id, formData));

    if (serverResponse) {
      setIsSubmitting(false);
      setErrors(serverResponse);
    } else {
      closeModal();
      setIsSubmitting(false);
      dispatch(setFeedComponent("FeedMySites"));
    }
  };
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

    setSitePhoto(e.target.files[0]);
  };

  return (
    <div className="site-update-modal">
      <h1>Update Launch Site</h1>
      <div className="form-errors">{errors.server}</div>
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
        <div className="form-errors">{errors.name}</div>

        <label>
          Latitude
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <div className="form-errors">{errors.lat}</div>

        <label>
          Longitude
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
        </label>
        <div className="form-errors">{errors.lon}</div>

        <label>
          Altitude
          <input
            type="number"
            value={altitude}
            onChange={(e) => setAltitude(e.target.value)}
          />
        </label>
        <div className="form-errors">{errors.altitude}</div>

        <label>
          Site Intro
          <textarea
            value={intro}
            className="text-area"
            onChange={(e) => setIntro(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.intro}</div>

        <label className="form-label">
          Update Site Photo
          <span id="site-label-info">
            A site photo is required & a good one shows a launch in progress!
          </span>
          <div className="file-inputs-container">
            <img src={imageURL} alt="Flight" className="thumbnails-noname" />
            <h4
              htmlFor="post-image-input"
              className="file-input-labels clickable"
            >
              Update site photo
            </h4>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="post-image-input"
              onChange={fileWrap}
              className="form-input"
            />
          </div>
        </label>
        <div className="form-errors">{errors.site_photo}</div>

        <div
          className={`submit-button clickable ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Update Launch Site"}
        </div>
      </form>
    </div>
  );
}

export default SiteUpdateModal;
