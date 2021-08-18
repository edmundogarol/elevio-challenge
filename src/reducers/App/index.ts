import { SEARCHING_TEXT, UPDATE_SEARCHED_ARTICLES } from "../../actions/App";
import { AppState, Article } from "./types";

const INITIAL_STATE: AppState = {
  articles: [],
  searching: false,
};

export const appReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SEARCHING_TEXT:
      return {
        ...state,
        searching: true,
      };

    case UPDATE_SEARCHED_ARTICLES:
      const { articles } = action.payload;
      return {
        ...state,
        articles: articles as Article[],
        searching: false,
      };

    default:
      return state;
  }
};

export default appReducer;
