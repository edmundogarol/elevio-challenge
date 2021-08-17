import React from "react";

import { DispatchProps, StateProps } from "./types";
import { AppContainer, SearchContainer } from "./styles";

export type UiProps = StateProps & DispatchProps;

function Ui(props: UiProps) {
  const { articles, searchText } = props;

  console.log({ articles });
  return (
    <AppContainer>
      <SearchContainer>
        <h2>Search Elevio Articles</h2>
        <input
          placeholder="Search Articles"
          onChange={(e) => searchText(e.target.value)}
        />
      </SearchContainer>
    </AppContainer>
  );
}

export default Ui;
