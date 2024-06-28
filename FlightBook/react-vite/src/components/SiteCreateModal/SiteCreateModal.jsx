import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSiteThunk } from "../../redux/sites"; // You'll need to create this thunk
import "./SiteCreateModal.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

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
  const [imageURL, setImageURL] = useState("../../../SMALLLOGO.png");
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData();
    if (sitePhoto === "") {
      setIsSubmitting(false);

      return setErrors({ site_photo: "Site Photos ARE required :)" });
    }

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
    setIsSubmitting(false);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="site-create-modal">
      <h1>Create Site</h1>

      {/* {errors.server && <p className="form-errors">{errors.server}</p>} */}
      <div className="form-errors">{errors.server}</div>
      <div style={{ height: "200px", width: "200px" }}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        ></Map>
      </div>
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

        {/* <label>
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
        <div className="form-errors">{errors.lon}</div> */}

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
          Upload Site Photo
          <span id="site-label-info">
            A site photo is required & a good one shows a launch in progress!
          </span>
          <div className="file-inputs-container">
            <img src={imageURL} alt="Flight" className="thumbnails-noname" />
            <h4
              htmlFor="post-image-input"
              className="file-input-labels clickable"
            >
              Upload a photo
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
          {isSubmitting ? "Submitting..." : "Create Site"}
        </div>
      </form>
    </div>
  );
}

export default SiteCreateModal;
