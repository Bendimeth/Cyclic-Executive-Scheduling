import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart, IChartData } from './Chart';
import { Inputs } from './Inputs';
import { ITask, TaskGroup } from './Task';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Home: FC = () => {
  const [inputData, setInputData] = useState<ITask[]>([]);
  const [chartData, setChartData] = useState<IChartData>();

  useEffect(() => {
    setChartData(new TaskGroup(inputData).PrepairChartData());
  }, [inputData]);

  return (
    <HomeWrapper>
      <Inputs
        setData={setInputData}
      />
      <Chart
        data={chartData}
      />
    </HomeWrapper>
  )
}