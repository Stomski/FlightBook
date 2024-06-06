import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser, "SESSION USER IN NAVIGATION COMPONENT");
  return (
    <div className="navbardiv">
      <div>
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

        <div className="user-pulldown-menu">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
