import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/**
to be created and utilized in that upper left corner,

corresponding info pages for the selected FEED view, which i can access via the useSelector

FeedAllSites
FeedMySites
featureComingSoon
FeedAllFlights
FeedFlightsByUser


 */

function LeftInfoAllSites() {
  return (
    <>
      <h2>All the Launch Sites in our DB:</h2>
      <p>search feature coming soon :)</p>
    </>
  );
}

function LeftInfoAllFlights() {
  return (
    <>
      <h1>These are the most recent contributions to our flight DB! </h1>
      <p>new ways to explore and interact coming soon :)</p>
    </>
  );
}

function LeftInfoFlightsByUser() {
  return (
    <>
      <h1>THIS is your log book!</h1>
      <p>good on you for keeping one, I sure never did.</p>

      <p>Thats Why I made theFreeFlightSite</p>

      <h3>STATS:</h3>
      <p>coming soon</p>
    </>
  );
}

function LeftInfoMySites() {
  return (
    <>
      <h2>These are all the sites which you have submitted to the database:</h2>
      <p>thank you for your contributions!</p>
    </>
  );
}

function LeftInfoFeatureComingSoon() {
  return (
    <>
      <h1>explore elsewhere</h1>
      <h1>for now</h1>
    </>
  );
}

function LeftInfoFlightInfo() {
  return (
    <>
      <h2>Flight Details</h2>
      <p>Pilot</p>
      <p>ETC</p>
    </>
  );
}

function LeftInfoSiteInfo() {
  return (
    <>
      <h2>Site Details</h2>
      <p>Pilot</p>
      <p>ETC</p>
    </>
  );
}

function WelcomePage() {
  return (
    <>
      <h2>Welcome to the Free Flight Site!</h2>
      <h1>we know you love to explore</h1>
      <h2>Search Launch Sites:</h2>
      <h1>(coming soon)</h1>
    </>
  );
}

function LeftPageInfo() {
  const feedComponentName = useSelector(
    (state) => state.view["feedComponentName"]
  );
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <section className="left-page-info-div">
      {sessionUser ? (
        <>
          {feedComponentName === "FeedFlightInfo" && <LeftInfoFlightInfo />}
          {feedComponentName === "FeedSiteInfo" && <LeftInfoSiteInfo />}
          {feedComponentName === "FeedAllSites" && <LeftInfoAllSites />}
          {feedComponentName === "FeedAllFlights" && <LeftInfoAllFlights />}
          {feedComponentName === "FeedMySites" && <LeftInfoMySites />}
          {feedComponentName === "WelcomePage" && <WelcomePage />}

          {feedComponentName === "FeedFlightsByUser" && (
            <LeftInfoFlightsByUser />
          )}
          {feedComponentName === "featureComingSoon" && (
            <LeftInfoFeatureComingSoon />
          )}
          {!feedComponentName && <WelcomePage />}
        </>
      ) : (
        <h1>
          Create a profile or log in to enjoy all the functionality of the free
          flight site !!!
        </h1>
      )}
    </section>
  );
}

export default LeftPageInfo;
