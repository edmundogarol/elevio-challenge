import React, { useState } from "react";
import { Input, Tooltip, Alert } from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { DispatchProps, StateProps } from "./types";
import {
  AppContainer,
  SearchContainer,
  SearchInputButtonContainer,
  Logo,
} from "./styles";
import { getImageResource } from "../../utils/utils";

export type UiProps = StateProps & DispatchProps;

function Ui(props: UiProps) {
  const { articles, searchTextCall, searching } = props;
  const [searchText, updateSearchText] = useState<string>("");
  const [searchError, updateSearchError] = useState<string>("");

  const handleSearchCall = () => {
    if (searchText.length < 3) {
      updateSearchError("Please enter 3 or more letters to search.");
    } else {
      updateSearchError("");
      searchTextCall(searchText);
    }
  };

  console.log({ articles });

  return (
    <AppContainer>
      <SearchContainer>
        <Logo alt="Elevio" src={getImageResource("elevio.png")} />
        <h2>Search Elevio Articles</h2>
        <SearchInputButtonContainer>
          <Input
            placeholder="Search Articles"
            onChange={(e) => updateSearchText(e.target.value)}
            suffix={
              <Tooltip title="Search">
                <button
                  className="search-icon"
                  onClick={() => handleSearchCall()}
                >
                  <SearchOutlined />
                </button>
              </Tooltip>
            }
          />
        </SearchInputButtonContainer>
        {searching && <LoadingOutlined />}
        {!!searchError.length && (
          <Alert
            showIcon
            message={searchError}
            type="warning"
            closable
            onClose={() => updateSearchError("")}
          />
        )}
      </SearchContainer>
    </AppContainer>
  );
}

export default Ui;
