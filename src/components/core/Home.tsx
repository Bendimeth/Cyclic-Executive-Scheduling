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
  const [cpuUsage, setCpuUsage] = useState<number>(0);

  useEffect(() => {
    const dataInstance = new TaskGroup(inputData);
    setChartData(dataInstance.PrepairChartData());
    setCpuUsage(dataInstance.SerializationCondition());
  }, [inputData]);

  return (
    <HomeWrapper>
      <Inputs
        setData={setInputData}
      />
      <Chart
        utilizationFactor={cpuUsage}
        data={chartData}
      />
    </HomeWrapper>
  )
}