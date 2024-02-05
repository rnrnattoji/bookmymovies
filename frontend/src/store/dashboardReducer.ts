import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationsObject {
  locationId: string;
  locationName: string;
}

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

interface DashboardState {
  locations: LocationsObject[] | null;
  selectedLocationInfo: LocationsObject | null;
  movieLocations: MovieLocationsObject | null;
}

const initialState: DashboardState = {
  locations: null,
  selectedLocationInfo: null,
  movieLocations: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setAllLocationsInfo: (state, action: PayloadAction<LocationsObject[]>) => {
      state.locations = action.payload;
    },
    setSelectedLocationInfo: (state, action: PayloadAction<LocationsObject>) => {
      state.selectedLocationInfo = action.payload;
    },
    setMovieLocationsInfo: (
      state,
      action: PayloadAction<MovieLocationsObject>
    ) => {
      state.movieLocations = action.payload;
    },
  },
});

export type RootState = {
  dashboard: DashboardState;
};

// Action creators are generated for each case reducer function
export const {
  setAllLocationsInfo,
  setSelectedLocationInfo,
  setMovieLocationsInfo,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
