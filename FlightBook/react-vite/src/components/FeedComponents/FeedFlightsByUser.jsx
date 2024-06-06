import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import "./FeedFlightsByUser.css";

export default function FeedFlightsByUser() {
  const flights = useSelector((state) => state.flights);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);
  useEffect(() => {
    dispatch(getFlightsByUserThunk(sessionUser.id));
  }, [view, sessionUser]);

  return (
    <section className="flights-by-user-feed">
      {flights["selectedUsersFlights"] &&
        Object.values(flights["selectedUsersFlights"]).map((flight) => (
          <div className="flight-card-div" key={flight.id}>
            <h2 className="flight-title">{flight.site_name}</h2>
            <div className="flight-info">
              <p>{`Duration: ${flight.length} minutes        Date: ${new Date(
                flight.start_time
              ).toLocaleDateString()}`}</p>
            </div>
            <OpenModalMenuItem
              itemText="Edit your Flight"
              modalComponent={<FlightUpdateModal flight={flight} />}
            />
          </div>
        ))}
    </section>
  );
}
