import React, { FC } from 'react';
import styled from 'styled-components';
import { Chart } from './Chart';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Home: FC = () => {
  return (
    <HomeWrapper>
      <header>Home component head</header>
      <Chart/>
    </HomeWrapper>
  )
}