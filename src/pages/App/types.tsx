export type StateProps = {
  searching: boolean;
  articles: any[];
};

export type DispatchProps = {
  searchTextCall: (text: string) => void;
};
