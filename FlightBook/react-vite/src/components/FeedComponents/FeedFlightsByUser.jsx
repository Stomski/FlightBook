import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
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
              <p>{`Duration: ${flight.length} minutes`}</p>
              {flight.flight_photo && (
                <img
                  className="flight-photo"
                  src={flight.flight_photo}
                  alt=""
                />
              )}
              <p>{`Date: ${new Date(
                flight.start_time
              ).toLocaleDateString()}`}</p>
              <p>{`Equipment: ${flight.equipment}`}</p>
              <p>{`Log: ${flight.log}`}</p>
              <p>{`Weather: ${flight.weather ? flight.weather : "N/A"}`}</p>
              <p>{`Created At: ${new Date(
                flight.created_at
              ).toLocaleString()}`}</p>
              <p>{`Updated At: ${new Date(
                flight.updated_at
              ).toLocaleString()}`}</p>
            </div>
            <div className="clickable modal-button">
              <OpenModalMenuItem
                itemText="Edit your Flight"
                modalComponent={<FlightUpdateModal flight={flight} />}
              />
            </div>
            <div className="clickable modal-button">
              <OpenModalMenuItem
                itemText="Delete this Flight"
                modalComponent={<FlightDeleteModal flight={flight} />}
              />
            </div>
          </div>
        ))}
    </section>
  );
}
