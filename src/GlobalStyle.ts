import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    font-family: Arial;
    font-weight: normal;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
    list-style: none;

    body{
      width: 100%;
      height: 100%;
      
      img{
        max-width: 100%;
      }
    }
  }
`;

export const ContainerContent = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  background-color: #111;

  > video {
    max-width: 90%;
    min-height: 100px;
  }
`;