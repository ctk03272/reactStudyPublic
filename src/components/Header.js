import React from "react";
import styled from "styled-components";

const HeaderBlock = styled.header`
  display: flex;
  background-color: #00c73c;
`;

const SearchBlock = styled.div`
  flex:none;
  display: flex;
  width: 400px;
  padding : 14px 0;
  margin-left: 10px;
`;

const LogoBlock = styled.div`
  display: flex;
  margin-left: auto;
`;

const SpecificLogo = styled.div`
  flex: none;
  padding:20px 30px;
  background-color: rgba(0,0,0,.4);
`;

const SpecificGnb=styled.div`
  flex: none;
  padding:20px 30px;
  background-color: rgba(0,0,0,.4);
`;

const SearchInput=styled.input`
  
`;

const SearchButton =styled.button`
    width: 37px;
    border: 0;
    background-color: #26a93a;
`;

const Header = () => {
    return (
        <HeaderBlock>
            <SearchBlock>
                <SearchInput/>
                <SearchButton>검색</SearchButton>
            </SearchBlock>
            <LogoBlock>
                <SpecificLogo>LOGO</SpecificLogo>
                <SpecificGnb>GNB</SpecificGnb>
            </LogoBlock>
        </HeaderBlock>
    );
};

export default Header;

