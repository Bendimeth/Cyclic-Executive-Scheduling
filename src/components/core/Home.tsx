import React, { FC } from 'react';
import styled from 'styled-components';
import { Chart } from './Chart';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Home: FC = () => {
  return (
    <HomeWrapper>
      <header>Home component head</header>
      <Chart/>
    </HomeWrapper>
  )
}