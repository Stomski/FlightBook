import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import LeftColumn from "../LeftColumn/LeftColumn";
import Feed from "../Feed/Feed";
import "./MainPage.css";

function MainPage() {
  return (
    <section className="mainpagesection">
      <LeftColumn />
      <Feed />
    </section>
  );
}

export default MainPage;
