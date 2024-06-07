import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
import "./FeedFlightsByUser.css";

export default function FeedSiteInfo() {
  const site = useSelector((state) => state.sites.detailView);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);

  // useEffect(() => {
  //   dispatch();
  // }, [view, sessionUser]);

  return (
    <section className="site-info-feed">
      <h2>TOP OF FEED SITE INFO</h2>
      {site && (
        <div className="site-details-card">
          <h2 className="site-title">{` DETAILS ABOUT ${site.name}`}</h2>
        </div>
      )}
    </section>
  );
}
