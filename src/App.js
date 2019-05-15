import React from "react";
import styled from "styled-components";
import GlobalStyle from './styles/global.styles';
import PrintGraph from "./PrintGraph";
import PrintGraphConnections from "./PrintGraphConnections";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />

      <PrintGraphConnections />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
   
`;

