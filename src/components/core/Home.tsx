import { mockChartkData, mockInputData } from 'components/utils/mocks';
import React, { FC } from 'react';
import styled from 'styled-components';
import { takeCoverage } from 'v8';
import { Chart } from './Chart';
import { ITask, TaskGroup } from './Task';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Home: FC = () => {
  const realData = () => {
    //example Data
    let listOfTasks: Array<ITask> = [
      {name: 'z3',period: 50,processingTime: 4,deadline: 50},
      {name: 'z1',period: 25,processingTime: 8,deadline: 25},
      {name: 'z5',period: 100,processingTime: 6,deadline: 100},
      {name: 'z4',period: 50,processingTime: 4,deadline: 50},
      {name: 'z2',period: 25,processingTime: 7,deadline: 25}
    ]

    const taskGroup = new TaskGroup(listOfTasks);
    return taskGroup.PrepairChartData();
  }

  let dataForChart = realData();
  console.log(dataForChart);

  return (
    <HomeWrapper>
      <header>Home component head</header>
      <Chart
        data={dataForChart} // TODO: replace this mock data with real one
      />
    </HomeWrapper>
  )
}