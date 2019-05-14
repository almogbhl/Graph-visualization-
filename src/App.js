import React from "react";
import styled from "styled-components";
import GlobalStyle from './styles/global.styles';
import PrintGraph from "./PrintGraph";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />

      <PrintGraph />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
   
`;

