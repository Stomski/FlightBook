import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFlightsThunk } from "../../redux/flights";
import "./FeedAllFlights.css";

export default function FeedAllFlights() {
  const flights = useSelector((state) => state.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFlightsThunk());
  }, []);

  console.log("%c flights log>", "color:red; font-size: 26px", flights);
  Object.values(flights).forEach((flight) => {
    console.log(
      flight,
      "THIS IS A FLIGHT, DIRECTLY BELOW THIS SOMETHING IS BROKED BECAUSE USERNAME ISNT DEFINED ????????????????????????????????????????????????????????????????????????????????????????????????????????????"
    );
  });
  return (
    <section className="all-flights-feed">
      <h1>TOP OF VIEW RECENT FLIGHTS</h1>
      {Object.values(flights).map(
        (flight) =>
          flight &&
          flight.pilot && (
            <div className="flight-card-div" key={flight.id}>
              <h2 className="flight-title">{`${flight.pilot.username} flew at ${flight.site_name}`}</h2>
              <h3>{`for ${flight.length} minutes`}</h3>
            </div>
          )
      )}
    </section>
  );
}
