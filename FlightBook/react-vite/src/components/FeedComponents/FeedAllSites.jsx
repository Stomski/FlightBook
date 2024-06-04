import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSitesThunk } from "../../redux/sites";

export default function FeedAllSites() {
  const sites = useSelector((state) => state.sites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSitesThunk());
  }, []);

  return (
    <>
      <h1>TESTING FEED ALL SITES</h1>
      {Object.values(sites).map((site) => (
        <div className="site-card-div" key={site["id"]}>
          <h1>{site.name}</h1>
        </div>
      ))}
    </>
  );
}
