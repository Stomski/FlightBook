import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFlightsThunk } from "../../redux/flights";
import { setFeedComponent } from "../../redux/view";
import { flightDetailViewThunk } from "../../redux/flights";
import "./FeedAllFlights.css";

export default function FeedAllFlights() {
  const flights = useSelector((state) => state.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFlightsThunk());
  }, []);

  // console.log("%c flights log>", "color:red; font-size: 26px", flights);
  // Object.values(flights).forEach((flight) => {
  //   console.log(
  //     flight,
  //     "THIS IS A FLIGHT, DIRECTLY BELOW THIS SOMETHING IS BROKED BECAUSE USERNAME ISNT DEFINED ????????????????????????????????????????????????????????????????????????????????????????????????????????????"
  //   );
  // });

  const handleClick = (flightId) => {
    // console.log("HANDLE CLICK CALLED IN THE FEED ALL FLIGHTS COMPONENT");
    dispatch(setFeedComponent("FeedFlightInfo"));
    // right here i need to dispatch flight detail view thunk with a flight ID
    dispatch(flightDetailViewThunk(flightId));

    // console.log("%c flightId log>", "color:red; font-size: 26px", flightId);
  };

  return (
    <section className="all-flights-feed">
      {Object.values(flights).map(
        (flight) =>
          flight &&
          flight.pilot && (
            <div
              onClick={() => handleClick(flight.id)}
              className="flight-card-div clickable"
              key={flight.id}
            >
              <div className="flight-info">
                {flight.pilot.user_photo && (
                  <img
                    className="flight-user-photo"
                    src={flight.pilot.user_photo}
                    alt={`${flight.pilot.username}'s profile`}
                  />
                )}
                <div>
                  <h2 className="flight-title">{`${flight.pilot.username} flew from ${flight.site_name}`}</h2>
                  <h3 className="flight-times">{`for ${flight.length} minutes on ${flight.start_time}`}</h3>
                </div>
              </div>
              {flight.flight_photo && (
                <img
                  className="flight-photo"
                  src={flight.flight_photo}
                  alt=""
                />
              )}
            </div>
          )
      )}
    </section>
  );
}
