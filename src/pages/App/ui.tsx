import React, { useState } from "react";
import { Input, Tooltip, Alert } from "antd";
import { NavLink } from "react-router-dom";
import {
  SearchOutlined,
  LoadingOutlined,
  FileTextOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { DispatchProps, StateProps } from "./types";
import {
  AppContainer,
  SearchContainer,
  SearchInputButtonContainer,
  ArticleLine,
  Logo,
} from "./styles";
import { getImageResource } from "../../utils/utils";

export type UiProps = StateProps & DispatchProps;

function Ui(props: UiProps) {
  const { articles, searchTextCall, searching } = props;
  const [searchText, updateSearchText] = useState<string>("");
  const [searchError, updateSearchError] = useState<string>("");

  const handleSearchCall = (e?: { key: string } | undefined) => {
    if (e && e.key !== "Enter") return;
    if (searchText.length < 3) {
      updateSearchError("Please enter 3 or more letters to search.");
    } else {
      updateSearchError("");
      searchTextCall(searchText);
    }
  };

  return (
    <AppContainer>
      <SearchContainer>
        <NavLink to="/">
          <Logo alt="Elevio" src={getImageResource("elevio.png")} />
        </NavLink>
        <h2>Search Elevio Articles</h2>
        <SearchInputButtonContainer>
          <Input
            value={searchText}
            placeholder="Search Articles"
            onKeyPress={handleSearchCall}
            onChange={(e) => updateSearchText(e.target.value)}
            suffix={
              <>
                <Tooltip title="Clear Search">
                  <button
                    className="search-icon"
                    onClick={() => updateSearchText("")}
                  >
                    <CloseOutlined />
                  </button>
                </Tooltip>
                <Tooltip title="Search">
                  <button
                    className="search-icon"
                    onClick={() => handleSearchCall()}
                  >
                    <SearchOutlined />
                  </button>
                </Tooltip>
              </>
            }
          />
        </SearchInputButtonContainer>
        {searching && <LoadingOutlined className="loading-icon" />}
        {!!searchError.length && (
          <Alert
            showIcon
            message={searchError}
            type="warning"
            closable
            onClose={() => updateSearchError("")}
          />
        )}
        {articles.map((article) => (
          <NavLink key={article.id} to={`/article/${article.id}/`}>
            <ArticleLine>
              <FileTextOutlined />
              <div>{article.title}</div>
            </ArticleLine>
          </NavLink>
        ))}
      </SearchContainer>
    </AppContainer>
  );
}

export default Ui;
