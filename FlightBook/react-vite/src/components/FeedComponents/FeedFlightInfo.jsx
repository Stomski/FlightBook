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
      {flight && (
        <div className="flight-details-card">
          <h2 className="flight-title">{` flew from ${flight.site_name}`}</h2>
        </div>
      )}
    </section>
  );
}
