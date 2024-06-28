import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
import "./FeedSiteInfo.css";

export default function FeedSiteInfo() {
  const site = useSelector((state) => state.sites.detailView);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);

  // useEffect(() => {
  //   dispatch();
  // }, [view, sessionUser]);
  // console.log(
  //   site,
  //   "SITE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  // );
  return (
    <section className="site-info-feed">
      {site ? (
        <div className="site-details-card">
          <h2 className="site-title">{`Details About ${site.name}`}</h2>
          <img
            className="site-photo"
            src={site.site_photo}
            alt={`${site.name}`}
          />
          <p className="site-intro">{site.intro}</p>
          <p className="site-altitude">Altitude: {site.altitude} feet</p>
          <p className="site-coordinates">
            Coordinates: ({site.lat}, {site.lon})
          </p>

          <p className="site-official">
            Official: {site.official ? "Yes" : "No"}
          </p>

          <p className="site-updated-at">
            last updated: {new Date(site.updated_at).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No site details available.</p>
      )}
    </section>
  );
}
