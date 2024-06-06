import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedAllSites from "../FeedComponents/FeedAllSites";
import FeedAllFlights from "../FeedComponents/FeedAllFlights";
import FeedMySites from "../FeedComponents/FeedMySites";
import FeedFlightsByUser from "../FeedComponents/FeedFlightsByUser";
import FeedFeatureComingSoon from "../FeedComponents/FeedFEatureComingSoon";

import "./Feed.css";

function Feed() {
  //pull the thing to be rendered from the store,
  //use selector for the store current viewing feed component
  //use effect that changes rendered componenet when the store variable changes

  const feedComponentName = useSelector(
    (state) => state.view["feedComponentName"]
  );

  console.log(
    "FEED COMPNENET NAME IN THE FEED JSX FUNCTION AFTER STATE SELECTION!!!!!!!!!!!!!!!!!!!!!",
    feedComponentName
  );

  return (
    <section className="FeedDiv">
      {feedComponentName === "FeedAllSites" && <FeedAllSites />}
      {feedComponentName === "FeedMySites" && <FeedMySites />}
      {feedComponentName === "FeedAllFlights" && <FeedAllFlights />}
      {feedComponentName === "FeedFlightsByUser" && <FeedFlightsByUser />}
      {feedComponentName === "featureComingSoon" && <FeedFeatureComingSoon />}
      {!feedComponentName && <FeedAllSites />}
    </section>
  );
}

export default Feed;
