import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbardiv">
      <div className="navlogodiv">LOGO</div>
      <div className="navmaindiv">placeholder top div</div>

      <ul className="usermenudiv">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
