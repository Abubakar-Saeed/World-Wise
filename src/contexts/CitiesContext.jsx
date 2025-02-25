import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unkonwn Action type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BaseURL = "http://localhost:9000";
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const result = await fetch(`${BaseURL}/cities`);
        const data = await result.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "rejected", payload: e.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      try {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: "loading" });
        const result = await fetch(`${BaseURL}/cities/${id}`);
        const data = await result.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "rejected", payload: e.message });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const result = await fetch(`${BaseURL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      dispatch({ type: "city/loaded", payload: data });
      dispatch({ type: "cities/created", payload: data });
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      const result = await fetch(`${BaseURL}/cities/${id}`, {
        method: "Delete",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        loading: isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("conetxt is used outside it's scope");
  return context;
}

export { CityProvider, useCities };
