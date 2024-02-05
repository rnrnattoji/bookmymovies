import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  setAllLocationsInfo,
  setSelectedLocationInfo,
  setMovieLocationsInfo,
} from "../../store/dashboardReducer";
import { host } from "../../appConfig";
import "./navbar.scss";

interface MovieLocationsObject {
  [locationId: string]: {
    locationName: string;
    movies: {
      movieID: string;
      movieTitle: string;
      movieImageURL: string;
    }[];
  };
}

interface LocationsObject {
  locationId: string;
  locationName: string;
}

const Navbar = () => {
  const [locations, setLocations] = useState<LocationsObject[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationsObject | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchcurrentShowingMovies() {
      const url = `${host}/api/resource/getCurrentShowingMovies`;
      try {
        const currentShowingMovies: MovieLocationsObject = (
          await axios.get(url)
        ).data;

        const locationsData: LocationsObject[] = [];
        for (const locationKey in currentShowingMovies) {
          locationsData.push({
            locationId: locationKey,
            locationName: currentShowingMovies[locationKey].locationName,
          });
        }
        dispatch(setAllLocationsInfo(locationsData));
        dispatch(setSelectedLocationInfo(locationsData?.[0]));
        dispatch(setMovieLocationsInfo(currentShowingMovies));
        setLocations(locationsData);
        setSelectedLocation(locationsData?.[0]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.message);
        }
      }
    }

    fetchcurrentShowingMovies();
  }, [dispatch]);

  const handleSetLocation = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const selectedOption = e.target.selectedOptions[0];
    const currentLocation: LocationsObject = {
      "locationId": selectedOption?.id || "",
      "locationName": selectedOption?.value || "",
    };
    dispatch(setSelectedLocationInfo(currentLocation));
    setSelectedLocation(currentLocation);
  }

  return (
    <>
      <div className="parent-navbar">
        <div className="inner-navbar">
          <img src="logo.png" alt="Logo" className="logo" />
          <input
            type="text"
            placeholder="Search For Movies"
            className="search"
          />
          <select
            className="dropdown"
            defaultValue={selectedLocation?.locationName}
            onChange={handleSetLocation}
          >
            {locations?.map((record, index) => (
              <option key={index} id={record.locationId} value={record.locationName}>
                {record.locationName} 
              </option>
            ))}
          </select>

          <button className="signin-btn">Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
