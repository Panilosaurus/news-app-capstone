export const NEWS_REDUCER_CASES = {
  INSERT_NEWS: "INSERT_NEWS",
  FETCHING_NEWS: "FETCHING_NEWS",
  DONE_FETCHING_NEWS: "DONE_FETCHING_NEWS",
  SAVE_NEWS: "SAVE_NEWS",
  UNSAVE_NEWS: "UNSAVE_NEWS",
};

const savedNewsFromStorage = JSON.parse(localStorage.getItem("savedNews")) || [];

const newsState = {
  news: [],
  savedNews: savedNewsFromStorage,
  loading: false,
};

const newsReducer = (state = newsState, action) => {
  switch (action.type) {
    case NEWS_REDUCER_CASES.INSERT_NEWS: {
      console.log("#5 NEWS_REDUCER_CASES.INSERT_NEWS");
      return {
        ...state,
        news: action.news,
        loading: false,
      };
    }
    case NEWS_REDUCER_CASES.FETCHING_NEWS: {
      console.log("#3 NEWS_REDUCER_CASES.FETCHING_NEWS");
      return {
        ...state,
        loading: true,
      };
    }
    case NEWS_REDUCER_CASES.DONE_FETCHING_NEWS: {
      console.log("#6 NEWS_REDUCER_CASES.DONE_FETCHING_NEWS");
      return {
        ...state,
        loading: false,
      };
    }
    case NEWS_REDUCER_CASES.SAVE_NEWS: {
      const savedNews = [...state.savedNews, action.news];
      localStorage.setItem("savedNews", JSON.stringify(savedNews));
      return {
        ...state,
        savedNews: savedNews,
      };
    }
    case NEWS_REDUCER_CASES.UNSAVE_NEWS: {
      const updatedSavedNews = state.savedNews.filter((saved) => saved._id !== action.newsId);
      return {
        ...state,
        savedNews: updatedSavedNews,
      };
    }
    default:
      return state;
  }
};

export { newsReducer };
