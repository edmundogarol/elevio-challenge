import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import Ui from "./ui";

import { DispatchProps, StateProps } from "./types";
import { searchText } from "../../actions/App";
import { AppState } from "../../reducers/App/types";

const stateToProps = (state: StateProps) => {
  const { articles, searching } = state;

  return {
    articles,
    searching,
  };
};

const dispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    searchTextCall: (text: string) => dispatch(searchText(text)),
  };
};

export default connect<StateProps, DispatchProps, {}, AppState>(
  stateToProps,
  dispatchToProps
)(Ui);
