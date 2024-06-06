import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMySitesThunk } from "../../redux/sites";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SiteUpdateModal from "../SiteCreateModal/SiteUpdateModal";
import SiteDeleteModal from "../SiteCreateModal/siteDeleteModal";
import "./FeedMySites.css";

export default function FeedMySites() {
  const sites = useSelector((state) => state.sites);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);

  useEffect(() => {
    dispatch(getMySitesThunk(sessionUser.id));
  }, [view]);

  console.log("%c sites log>", "color:red; font-size: 26px", sites);
  Object.values(sites).forEach((flight) => {
    console.log(flight);
  });
  return (
    <section className="my-sites-feed">
      {Object.values(sites).map((site) => (
        <div className="site-card-div" key={site.id}>
          <h2 className="site-title">{site.name}</h2>
          <div className="site-info">
            <p>Altitude: {site.altitude} ft</p>
            <p>Official Status: {site.official ? "Yes" : "No"}</p>

            <OpenModalMenuItem
              itemText="Edit this Launch Site"
              modalComponent={<SiteUpdateModal site={site} />}
            />

            <OpenModalMenuItem
              itemText="Delete this Launch Site"
              modalComponent={<SiteDeleteModal site={site} />}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
