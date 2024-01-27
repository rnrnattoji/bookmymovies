import axios from "axios";
import { useEffect, useState } from "react";

import { host } from "../../appConfig";
import "./dashboard.scss";

interface MovieObject {
  id: string;
  title: string;
  image: string;
  addedDate: string;
  addedBy: string;
}

const Dashboard = () => {
  const [currentlyShowing, setCurrentlyShowing] = useState<MovieObject[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const url = `${host}/api/resource/getMovies`;
      try {
        const response = await axios.get(url);
        console.log(response);
        setCurrentlyShowing(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.message);
        }
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <div className="outer-container">
        {currentlyShowing?.map((record, index) => (
          <div className="container" key={index}>
            <img className="movie-img-poster" src={record.image} alt="" />
            <h3 className="movie-name">{record.title}</h3>
            <div className="button">
              <a href="#">Book Tickets</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
