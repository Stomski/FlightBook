import FeedAllSites from "../FeedComponents/FeedAllSites";
import FeedAllFlights from "../FeedComponents/FeedAllFlights";

import "./Feed.css";

function Feed() {
  return (
    <section className="FeedDiv">
      <h1>THIS IS THE FEED JSX RETURN TOP</h1>
      <FeedAllSites />
      <h1>THIS IS THE FEED JSX ABOVE THE FLIGHTS FEED, BELOW SITES</h1>
      <FeedAllFlights />
    </section>
  );
}

export default Feed;
