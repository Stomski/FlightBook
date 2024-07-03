import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsByUserThunk } from "../../redux/flights";
import FlightUpdateModal from "../FlightCreateModal/FlightUpdateModal";
import FlightDeleteModal from "../FlightCreateModal/FlightDeleteModal";
import { getReviewsBySiteThunk } from "../../redux/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewCreateModal from "../ReviewModal/ReviewCreateModal";
import ReviewDeleteModal from "../ReviewModal/ReviewDeleteModal";
import "./FeedSiteInfo.css";

export default function FeedSiteInfo() {
  const site = useSelector((state) => state.sites.detailView);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const view = useSelector((state) => state.view);
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    if (site) {
      dispatch(getReviewsBySiteThunk(site["id"]));
    }
  }, [view, sessionUser, site]);

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
            Last updated: {new Date(site.updated_at).toLocaleString()}
          </p>

          {sessionUser ? (
            <div className="site-details-reviews-div">
              <div className="review-title-div">
                <h2>Reviews:</h2>
                <h4>
                  Have you flown here?
                  <div className="clickable modal-button">
                    <OpenModalMenuItem
                      itemText="Review this Launch Site"
                      modalComponent={<ReviewCreateModal site={site} />}
                    />
                  </div>
                </h4>
              </div>
              {reviews ? (
                Object.values(reviews).map((review) => (
                  <div key={review.id} className="review-card">
                    <p className="review-content-p">{review.review}</p>
                    <div className="review-creator-info-div">
                      <img
                        className="user-photo-reviews"
                        src={review.creator["user_photo"]}
                        alt=""
                      />
                      <p>{review.creator["username"]}</p>
                      {sessionUser.id === review.creator_id ? (
                        <div className="review-edit-delete-div">
                          <div className="review-button-div clickable">
                            <OpenModalMenuItem
                              itemText="Edit"
                              modalComponent={
                                <ReviewCreateModal review={review} />
                              }
                            />
                          </div>
                          <div className="review-button-div clickable delete-review">
                            <OpenModalMenuItem
                              itemText="Delete"
                              modalComponent={
                                <ReviewDeleteModal review={review} />
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="review-not-my-review-div clickable">
                          connect with {review.creator["first_name"]} (feature
                          coming soon!)
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          ) : (
            <h1>Log in to see or make reviews</h1>
          )}
        </div>
      ) : (
        <p>No site details available.</p>
      )}
    </section>
  );
}
