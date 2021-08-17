import styled from "styled-components";

export const AppContainer = styled.div`
  height: 45em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 7em;
  border-radius: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #676767;
    margin: unset;
    margin-bottom: 1em;
  }

  input {
    width: 20em;
    padding: 1em;
    font-size: 1em;
    border-radius: 0.5em;
    border: 1px solid #a7a7a7;
  }
`;