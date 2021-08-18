export const SEARCH_TEXT = "app/SEARCH_TEXT";
export const SEARCHING_TEXT = "app/SEARCHING_TEXT";
export const UPDATE_SEARCHED_ARTICLES = "app/UPDATE_SEARCHED_ARTICLES";

export const SEARCH_LOG = "app/SEARCH_LOG";
export const ARTICLE_VIEW_LOG = "app/ARTICLE_VIEW_LOG";

export const searchText = (text: string) => ({
  type: SEARCH_TEXT,
  payload: {
    text,
  },
});

export const searching = () => ({
  type: SEARCHING_TEXT,
});

export const updateArticles = (articles: any[]) => ({
  type: UPDATE_SEARCHED_ARTICLES,
  payload: {
    articles,
  },
});

export const searchLog = (searchText: string) => ({
  type: SEARCH_LOG,
  payload: {
    searchText,
  },
});

export const articleViewLog = (article: number) => ({
  type: ARTICLE_VIEW_LOG,
  payload: {
    article,
  },
});
