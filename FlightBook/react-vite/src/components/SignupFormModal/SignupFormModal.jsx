import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageURL, setImageURL] = useState("../../../SMALLLOGO.png");

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    if (photo !== "") {
      formData.append("user_photo", photo);
    }
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    if (!emailRegex.test(email)) {
      setIsSubmitting(false);
      return setErrors({
        email: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      setIsSubmitting(false);

      return setErrors({
        confirmPassword: "Passwords do not match",
      });
    }

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setIsSubmitting(false);

      return setErrors(serverResponse);
    } else {
      setIsSubmitting(false);

      closeModal();
    }
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setErrors({ server: "max file size exceeded" }); // "Selected image exceeds the maximum file size of 5Mb"
      return;
    }

    const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);

    setSitePhoto(e.target.files[0]);
  };

  return (
    <div className="signup-form-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* <label>
          Upload a Profile Image
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </label> */}
        <label className="file-inputs-container">
          <h4
            htmlFor="post-image-input"
            className="file-input-labels-signup clickable"
          >
            Upload a photo
            <img
              src={imageURL}
              alt="Flight"
              className="thumbnails-noname-signup"
            />
          </h4>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="post-image-input"
            onChange={fileWrap}
            className="form-input"
          />
        </label>

        <div className="form-errors">{errors.photo || errors.server || ""}</div>

        <label>
          Email
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.email}</div>

        <label>
          First Name
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.first_name}</div>

        <label>
          Last Name
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.last_name}</div>

        <label>
          Username
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.username}</div>

        <label>
          Password
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.password}</div>

        <label>
          Confirm Password
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="form-errors">{errors.confirmPassword}</div>

        <div
          className={`submit-button clickable ${
            isSubmitting ? "submitting" : ""
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Sign-up!"}
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
