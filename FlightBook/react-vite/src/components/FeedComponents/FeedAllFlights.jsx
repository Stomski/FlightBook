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

  return (
    <section className="all-flights-feed">
      {Object.values(flights).map((flight) => (
        <div className="flight-card-div" key={flight["id"]}>
          <h2 className="flight-title">{flight["site_name"]}</h2>
        </div>
      ))}
    </section>
  );
}
