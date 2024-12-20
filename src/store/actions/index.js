import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { NEWS_REDUCER_CASES } from "../reducers";

const BASE_API_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export function fetchMovies(query) {
  return async function (dispatch) {
    console.log("#2 fetchMovies()");
    try {
      dispatch({
        type: NEWS_REDUCER_CASES.FETCHING_NEWS,
      });
      const queryString = qs.stringify(
        {
          ...query,
          "api-key": process.env.REACT_APP_API_KEY,
        },
        { encode: true }
      );

      console.log("#4 fetch api NY TIMES");
      const response = await fetch(`${BASE_API_URL}${queryString}`);

      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(responseJSON));
      }

      console.log("responseJSON:", responseJSON);

      dispatch({
        type: NEWS_REDUCER_CASES.INSERT_NEWS,
        news: responseJSON.response.docs,
      });
    } catch (error) {
      console.error("[actions-fetchMovies]:", error);
    } finally {
      dispatch({
        type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS,
      });
    }
  };
}
