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
      <h1>THIS IS THE GET ALL SITES THINGY MABOB SHOW RESPECT</h1>
    </>
  );
}

function LeftInfoAllFlights() {
  return (
    <>
      <h1>THIS IS THE GET ALL FLIGHTS YOU KNOW WHAT IT IS </h1>
    </>
  );
}

function LeftInfoFlightsByUser() {
  return (
    <>
      <h1>THIS IS THE GET ALL FLIGHTS BY USER</h1>
    </>
  );
}

function LeftInfoMySites() {
  return (
    <>
      <h2>These are all the sites which you have submitted to the database</h2>
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

function WelcomePage() {
  return (
    <>
      <h2>Welcome to the Free Flight Site!</h2>
      <h1>we know you love to explore</h1>
    </>
  );
}

function LeftPageInfo() {
  const feedComponentName = useSelector(
    (state) => state.view["feedComponentName"]
  );
  const sessionUser = useSelector((state) => state.session.user);
  console.log(
    "%c feedComponentName log>",
    "color:red; font-size: 26px",
    feedComponentName
  );

  return (
    <section className="left-page-info-div">
      {sessionUser ? (
        <>
          {feedComponentName === "FeedAllSites" && <LeftInfoAllSites />}
          {feedComponentName === "FeedAllFlights" && <LeftInfoAllFlights />}
          {feedComponentName === "FeedMySites" && <LeftInfoMySites />}

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
          Create a prfile or log in to enjoy all the functionality of the free
          flight site !!!
        </h1>
      )}
    </section>
  );
}

export default LeftPageInfo;
