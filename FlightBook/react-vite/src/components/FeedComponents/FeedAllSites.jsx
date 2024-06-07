import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFeedComponent } from "../../redux/view";
import { getAllSitesThunk } from "../../redux/sites";
import { getSiteDetailsThunk } from "../../redux/sites";

import "./FeedAllSites.css";

export default function FeedAllSites() {
  const sites = useSelector((state) => state.sites);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  console.log(Object.entries(sites), "OBJECT>ENTRIES OF SITES");
  const allSites = {};
  Object.entries(sites).forEach((set) => {
    console.log(
      set[0],
      "KEY",
      set[1],
      "VALUEEEEEEEEELl",
      "FEED ALL SITES COMPOMENT **************************************************************"
    );
    if (!isNaN(parseFloat(set[0]))) {
      allSites[set[1]["id"]] = set[1];
    }
  });
  console.log(allSites);

  useEffect(() => {
    dispatch(getAllSitesThunk());
  }, []);

  const handleClick = (siteId) => {
    console.log("HANDLE CLICK CALLED IN THE FEED ALL SITES COMPONENT", siteId);
    dispatch(setFeedComponent("FeedSiteInfo"));
    dispatch(getSiteDetailsThunk(siteId));
  };

  return (
    <section className="all-sites-feed">
      {Object.values(allSites).map((site) => (
        <div
          onClick={() => handleClick(site["id"])}
          className="site-card-div"
          key={site["id"]}
        >
          <h2 className="site-title">{site.name}</h2>
          <p>altitude: {site.altitude} ft</p>
          {site.site_photo && (
            <img className="site-photo" src={site.site_photo} alt="" />
          )}
          <p>
            official ushpa:{" "}
            {site.official ? "yes!" : "nope !! Fly at your own risk :)"}
          </p>
          {sessionUser && site.creator_id === sessionUser.id && (
            <>
              <h1>AY YO YOU MADE THIS SHIT!!! good for you</h1>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
