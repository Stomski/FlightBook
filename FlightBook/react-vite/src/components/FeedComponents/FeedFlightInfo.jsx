import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
import "./FeedFlightsByUser.css";

export default function FeedFlightInfo(flightId) {
  const flight = useSelector((state) => state.flights.flightId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);

  useEffect(() => {
    dispatch(getFlightsByUserThunk(sessionUser.id));
  }, [view, sessionUser]);

  return (
    <section className="flight-info-feed">
      <h2>THIS THE TITLE OF MY FLIGHT</h2>
    </section>
  );
}
