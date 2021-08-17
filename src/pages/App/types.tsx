export type StateProps = {
  articles: any[];
};

export type DispatchProps = {
  searchText: (text: string) => void;
};
