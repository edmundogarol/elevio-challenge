import { Article } from "../../reducers/App/types";

export type StateProps = {
  searching: boolean;
  articles: Article[];
};

export type DispatchProps = {
  searchTextCall: (text: string) => void;
  searchLog: (searchText: string) => void;
  articleViewLog: (article: number) => void;
};
