import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
import "./FeedFlightsByUser.css";

export default function FeedFlightInfo() {
  const flight = useSelector((state) => state.flights.detailView);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);

  // useEffect(() => {
  //   dispatch();
  // }, [view, sessionUser]);

  return (
    <section className="flight-info-feed">
      {flight ? (
        <div className="flight-details-card">
          <h2 className="flight-title">{`Flight from ${flight.site_name}`}</h2>
          {flight.flight_photo && (
            <img
              className="flight-photo"
              src={flight.flight_photo}
              alt={`Flight at ${flight.site_name}`}
            />
          )}
          <h3>Flight log:</h3>
          <p className="flight-log"> {flight.log}</p>
          <p className="flight-equipment">Equipment: {flight.equipment}</p>
          <p className="flight-length">
            Flight Duration: {flight.length} minutes
          </p>
          <p className="flight-start-time">
            Start Time: {new Date(flight.start_time).toLocaleString()}
          </p>
          {flight.weather && (
            <p className="flight-weather">Weather: {flight.weather}</p>
          )}
          <p className="flight-created-at">
            Created At: {new Date(flight.created_at).toLocaleString()}
          </p>
          <p className="flight-updated-at">
            Updated At: {new Date(flight.updated_at).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No flight details available.</p>
      )}
    </section>
  );
}
