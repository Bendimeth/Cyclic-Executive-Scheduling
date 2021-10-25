import { mockChartkData, mockInputData } from 'components/utils/mocks';
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
  const realData = () => {
    //TODO: this is the main function that will parse input data to chart payload
    mockInputData.forEach(task => {
      //...
    })
  }

  return (
    <HomeWrapper>
      <header>Home component head</header>
      <Chart
        data={mockChartkData} // TODO: replace this mock data with real one
      />
    </HomeWrapper>
  )
}