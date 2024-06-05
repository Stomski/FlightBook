import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import "./FeedFlightsByUser.css";

export default function FeedFlightsByUser() {
  const flights = useSelector((state) => state.flights);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getFlightsByUserThunk(sessionUser.id));
  }, []);

  return (
    <section className="flights-by-user-feed">
      {Object.values(flights).map((flight) => (
        <div className="flight-card-div" key={flight["id"]}>
          <h2 className="flight-title">{flight["site_name"]}</h2>
        </div>
      ))}
    </section>
  );
}
