// import axios from "axios";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import { host } from "../../appConfig";
import { RootState } from "../../store/dashboardReducer";
import "./dashboard.scss";


const Dashboard = () => {
  const selectedLocationInfo = useSelector(
    (state: RootState) => state.dashboard.selectedLocationInfo
  );
  const movieLocations = useSelector(
    (state: RootState) => state.dashboard.movieLocations
  );

  const currentlyShowing = [];
  for (const locationKey in movieLocations) {
    if (selectedLocationInfo?.locationId === locationKey) {
      const location = movieLocations[locationKey];
      if (location && location.movies && location.movies.length > 0) {
        for (let i = 0; i < location.movies.length; i++) {
          currentlyShowing.push({
            movieID: location.movies[i].movieID,
            movieTitle: location.movies[i].movieTitle,
            movieImageURL: location.movies[i].movieImageURL,
          });
        }
      }
    }
  }

  return (
    <>
      <div className="parent-movie-container">
        <h2>Recommended Movies</h2>
        <div className="outer-movie-container">
          {currentlyShowing?.map((record, index) => (
            <div className="movie-container" key={index}>
              <img className="movie-img-poster" src={record.movieImageURL} alt="" />
              <h3 className="movie-name">{record.movieTitle}</h3>
              <div className="button">
                <a href="#">Book Tickets</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
