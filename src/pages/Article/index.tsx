import styled from "styled-components";
import { useParams, withRouter } from "react-router-dom";

export const AppContainer = styled.div`
  height: 45em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: #676767;
    margin: unset;
    margin-bottom: 1em;
  }
`;

type PathParamsType = {
  id: string;
};

function Article() {
  const { id } = useParams<PathParamsType>();

  return (
    <AppContainer>
      <h2>{`Article ${id}`}</h2>
    </AppContainer>
  );
}

export default withRouter(Article);
