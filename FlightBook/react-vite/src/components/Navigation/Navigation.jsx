import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";

const demoUser = () => {
  console.log("DEMO USER CALLED");
  dispatch(thunkLogin({ email: "bobby@aa.io", password: "password" }));
};

function Navigation() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser, "SESSION USER IN NAVIGATION COMPONENT");

  const demoUser = () => {
    console.log("DEMO USER CALLED");
    dispatch(thunkLogin({ email: "bobby@aa.io", password: "password" }));
  };
  return (
    <div className="navbardiv">
      <div className="logo-container">
        <img className="logoimg" src="../../../public/PARAGLIDELOGO.png" />
      </div>

      <div className="navmaindiv">navmaindiv THIS DIV</div>

      <div className="usermenudiv">
        {sessionUser && sessionUser["user_photo"] && (
          <div className="user-photo">
            <img
              className="user-photo prof-image"
              src={sessionUser["user_photo"]}
              alt="user profile image"
            />
          </div>
        )}
        {!sessionUser && (
          <h3 onClick={demoUser} className="demo-user, clickable">
            demo user
          </h3>
        )}

        <div className="user-pulldown-menu">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
