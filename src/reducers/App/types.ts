export type Article = {
  id: number;
  title: string;
};

export interface AppState {
  articles: Article[];
  searching: boolean;
}
