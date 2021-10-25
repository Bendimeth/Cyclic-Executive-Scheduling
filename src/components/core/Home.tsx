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
      {name: 'z1',period: 25,processingTime: 8,deadline: 25},
      {name: 'z2',period: 25,processingTime: 7,deadline: 25},
      {name: 'z3',period: 50,processingTime: 4,deadline: 50},
      {name: 'z4',period: 50,processingTime: 4,deadline: 50},
      {name: 'z5',period: 100,processingTime: 10,deadline: 100}
    ]

    const taskGroup = new TaskGroup();
    taskGroup.SetTaskList(listOfTasks);

    //TODO: this is the main function that will parse input data to chart payload
    mockInputData.forEach(task => {
      //...
    })
  }

  realData();

  return (
    <HomeWrapper>
      <header>Home component head</header>
      <Chart
        data={mockChartkData} // TODO: replace this mock data with real one
      />
    </HomeWrapper>
  )
}