import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSitesThunk } from "../../redux/sites";
import "./FeedAllSites.css";

export default function FeedAllSites() {
  const sites = useSelector((state) => state.sites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSitesThunk());
  }, []);

  return (
    <section className="all-sites-feed">
      {Object.values(sites).map((site) => (
        <div className="site-card-div" key={site["id"]}>
          <h2 className="site-title">{site.name}</h2>
          <p>altitude: {site.altitude} ft</p>
          <p>official ushpa: {site.official ? "yes!" : "nope !!"}</p>
        </div>
      ))}
    </section>
  );
}