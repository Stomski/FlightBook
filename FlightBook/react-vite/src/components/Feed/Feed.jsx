import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedAllSites from "../FeedComponents/FeedAllSites";
import FeedAllFlights from "../FeedComponents/FeedAllFlights";
import FeedFlightsByUser from "../FeedComponents/FeedFlightsByUser";

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
      <h1>
        THIS IS the div returned from FEED.JSX, very TOP, FeedDiv for some
        reason
      </h1>
      <FeedAllSites />
      <h1>THIS IS THE FEED JSX ABOVE THE FLIGHTS FEED, BELOW SITES</h1>
      <FeedAllFlights />
      <h1>
        THIS IS THE FEED JSX ABOVE THE FLIGHTS BY USER FEED, BELOW ALL FLIGHTS
      </h1>
      <FeedFlightsByUser />
    </section>
  );
}

export default Feed;
