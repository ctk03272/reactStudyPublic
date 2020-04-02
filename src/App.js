import React from 'react';
import './App.css';
import styled from "styled-components";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Main from "./components/Main";

function App() {
    const WrapBlock = styled.div`
      display: flex;
      flex-direction: column;
      height: 100%;
`;
    const ContentBlock=styled.div`
    display: flex;
    flex: 1;
`;

    return (
        <WrapBlock>
            <Header/>
            <ContentBlock>
                <Aside/>
                <Main/>
            </ContentBlock>
        </WrapBlock>
    );
}

export default App;
