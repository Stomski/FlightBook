import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMySitesThunk } from "../../redux/sites";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SiteUpdateModal from "../SiteCreateModal/SiteUpdateModal";
import SiteDeleteModal from "../SiteCreateModal/siteDeleteModal";
import { setFeedComponent } from "../../redux/view";
import { getSiteDetailsThunk } from "../../redux/sites";
import "./FeedMySites.css";

export default function FeedMySites() {
  const sites = useSelector((state) => state.sites);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);
  const mySites = {};
  Object.entries(sites).forEach((set) => {
    if (!isNaN(parseFloat(set[0]))) {
      mySites[set[1]["id"]] = set[1];
    }
  });
  // console.log(mySites);

  useEffect(() => {
    dispatch(getMySitesThunk(sessionUser.id));
  }, [view]);

  const handleClick = (siteId) => {
    // console.log("HANDLE CLICK CALLED IN THE FEED ALL SITES COMPONENT", siteId);
    dispatch(setFeedComponent("FeedSiteInfo"));
    dispatch(getSiteDetailsThunk(siteId));
  };

  return (
    <section className="my-sites-feed">
      {Object.values(mySites).map((site) => (
        <div className="site-card-div" key={site.id}>
          <h2 className="site-title">{site.name}</h2>
          {site.site_photo && (
            <img
              onClick={() => handleClick(site.id)}
              className="site-photo clickable"
              src={site.site_photo}
              alt=""
            />
          )}
          <div className="site-info">
            <p>Altitude: {site.altitude} ft</p>
            <p>Official Status: {site.official ? "Yes" : "No"}</p>
            <p>Introduction: {site.intro}</p>
            <p>Latitude: {site.lat}</p>
            <p>Longitude: {site.lon}</p>
            <p>License Required: {site.license_required ? "Yes" : "No"}</p>
            <p>Created At: {new Date(site.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(site.updated_at).toLocaleString()}</p>

            <div className="clickable modal-button">
              <OpenModalMenuItem
                itemText="Edit this Launch Site"
                modalComponent={<SiteUpdateModal site={site} />}
              />
            </div>

            <div className="clickable modal-button">
              <OpenModalMenuItem
                itemText="Delete this Launch Site"
                modalComponent={<SiteDeleteModal site={site} />}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
