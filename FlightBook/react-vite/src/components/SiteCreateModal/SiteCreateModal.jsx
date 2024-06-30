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
  const [lat, setLat] = useState(40.015); // Default to Boulder's latitude
  const [lon, setLon] = useState(-105.2705); // Default to Boulder's longitude
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

    console.log("TOP OF THE HANDLE SUBMIT IN THE SITE CREATE COMPONENT");
    console.log("lat", lat);
    console.log("lon", lon);

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

  const handleMapClick = async (e) => {
    console.log(
      e.detail.latLng,
      "HANDLE MAP CLICK CALLED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
      "DIRECTLY NEXT IS MY FETCH CALL"
    );

    const latitude = e.detail.latLng.lat;
    const longitude = e.detail.latLng.lng;

    setLat(latitude);
    setLon(longitude);

    /*
    so i need to hit a backend route, which will then return my elevation info
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`;
  */

    // const response = await fetch(`/api/sites/elevation}`);
    // if (response.ok) {
    //   console.log(
    //     "RESPONSE OK IN  HANDLE MAP CLICK ROUTE CALL !!!!!!!!!!!!!!!!!!!!!!!!!!!"
    //   );
    //   const data = await response.json();
    //   // dispatch(createSite(data));
    //   console.log(data, "<<<<<<<<<<<<<<<<<<<<<<data");
    // } else if (response.status < 500) {
    //   console.log(
    //     "RESPPONSE NOT OK LESS THAN 500 HANDLE MAP CLICK ROUTE CALL ?????????????????????????????????????"
    //   );

    //   const errorMessages = await response.json();
    //   return errorMessages;
    // } else {
    //   console.log(
    //     "RESPPONSE BAD GREAATER THAN 500  vHANDLE MAP CLICK ROUTE CALL ?????????????????????????????????????"
    //   );
    //   return { server: "Something went wrong. Please try again" };
    // }

    const response = await fetch("/api/sites/elevation");
    if (response.ok) {
      // console.log(
      //   "I THINK THIS IS GETTING CALLED< GET ALL SITES THUNK > RESPONSE OK"
      // );
      const data = await response.json();
      console.log("DATA IN THE MAP CLICK !!!!!!!!!!!!!!!!!!!!!!!!!!", data);
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };
  const location = { lat: lat, lng: lon };
  return (
    <div className="site-create-modal">
      <h1>Create Site</h1>

      {/* {errors.server && <p className="form-errors">{errors.server}</p>} */}
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

        {/* <label>
          Altitude
          <input
          type="number"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)}
          />
          </label>
          <div className="form-errors">{errors.altitude}</div> */}

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

        <div className="photo-and-map-div">
          <div className="photo-upload-div">
            <label className="form-label">
              <h3>Upload Site Photo</h3>
              <span id="site-label-info">
                A site photo is required & a good one shows a launch in
                progress!
              </span>
              <div className="file-inputs-container">
                <img
                  src={imageURL}
                  alt="Flight"
                  className="thumbnails-noname"
                />
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
          </div>

          <div style={{ minHeight: "300px", width: "100%" }}>
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: 40.015, lng: -105.2705 }}
              mapId={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              reuseMaps="true"
              // onCameraChanged={(ev) =>
              //   console.log(
              //     "camera changed:",
              //     ev.detail.center,
              //     "zoom:",
              //     ev.detail.zoom
              //   )
              // }
              onClick={handleMapClick}
            >
              <AdvancedMarker position={location}>
                <Pin background={"purple"} glyphColor={"red"} />
              </AdvancedMarker>
            </Map>
          </div>
        </div>

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
