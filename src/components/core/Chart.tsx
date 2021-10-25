import { ChartOptions } from 'chart.js';
import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2'
import styled, { css } from 'styled-components';

const taskColor: any = {
  a: 'green',
  b: 'red',
  c: 'orange'
}

interface IChartData {
  majorCycle: number;
  cycles: {
    from: number;
    to: number;
    tasks: {
      from: number;
      to: number;
      name: string;
    }[];
  }[];
}

const ChartWrapper = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-weight: 600;
`;

const MajorCycleWrapper = styled.div`
  width: calc(100% - 4rem);
  overflow-x: auto;
  height: 150px;
  position: absolute;
  padding: 0 2rem;
`;

const MajorCycle = styled.div`
  display: flex;
  position: absolute;
`;


const TaskTile = styled.div<{ offset: number; width: number; name: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  bottom: 0;
  opacity: .8;
  left: ${props => props.offset * 20}px;
  width: ${props => props.width * 20}px;
  background: ${props => taskColor[props.name]};
  z-index: 1;
  transition: opacity .4s ease-in;
  margin: 0 0 1px 2px;
  &:after {
    content: '${props => props.width}';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 2px);
    height: 100%;
    bottom: -40px;
    transition: opacity .4s ease-in;
    border-left: 2px dotted rgba(0, 0, 0, .5);
    border-right: 2px dotted rgba(0, 0, 0, .5);
    background: rgba(0, 0, 0, .05);
    z-index: 3;
    opacity: 0;
  }
  &:hover {
    opacity: 1;
    z-index: 3;
    &:after {
      opacity: 1;
    }
  }
`;

const MinorCycle = styled.div<{ width: number; isStart: boolean, isEnd: boolean }>`
  border-left: ${props => props.isStart ? '2px solid' : '2px dotted'} rgba(0,0,0, .5);
  border-right: ${props => props.isEnd && '2px solid'} rgba(0,0,0, .5);
  border-bottom: 1px solid rgba(0,0,0, .5);
  display: flex;
  width: ${props => props.width * 20}px;
  height: 80px;
  z-index: 2;
`;


const Period = styled.div<{ isEnd?: boolean }>`
  position: absolute;
  bottom: -1.25rem;
  margin: 0 0 0 -.5rem;
  align-self: flex-end;
  font-weight: 600;
  ${props => props.isEnd && css`
    position: relative;
  `}
`;

export const Chart: FC = () => {

  const mockData: IChartData = {
    majorCycle: 100,
    cycles: [{
      from: 0,
      to: 25,
      tasks: [{
        name: 'a',
        from: 0,
        to: 8
      }, {
        name: 'b',
        from: 8,
        to: 14
      }, {
        name: 'c',
        from: 16,
        to: 26
      }]
    }, {
      from: 25,
      to: 50,
      tasks: [{
        name: 'a',
        from: 26,
        to: 35
      }, {
        name: 'b',
        from: 34,
        to: 42
      }, {
        name: 'c',
        from: 42,
        to: 50
      }]
    }, {
      from: 50,
      to: 75,
      tasks: [{
        name: 'a',
        from: 50,
        to: 58
      }, {
        name: 'b',
        from: 58,
        to: 66
      }, {
        name: 'c',
        from: 66,
        to: 74
      }]
    }, {
      from: 75,
      to: 100,
      tasks: [{
        name: 'a',
        from: 74,
        to: 82
      }, {
        name: 'b',
        from: 82,
        to: 90
      }, {
        name: 'c',
        from: 90,
        to: 98
      }]
    }]
  }

  return (
    <ChartWrapper>
      <div className='header'>
        <h1 className='title'>Vertical Bar Chart</h1>
      </div>
      <MajorCycleWrapper>
        <MajorCycle>
          {mockData.cycles.map(cycle => (
            <MinorCycle
              key={cycle.from}
              width={cycle.to - cycle.from}
              isStart={cycle.from === 0}
              isEnd={cycle.to === mockData.majorCycle}
            >
              <Period>{cycle.from}</Period>
              {cycle.tasks.map(task => (
                <TaskTile
                  key={cycle.from + task.name}
                  width={task.to - task.from}
                  offset={task.from}
                  name={task.name}
                >
                  {task.name}
                </TaskTile>
              ))}
            </MinorCycle>

          ))}
          <Period isEnd>{mockData.majorCycle}</Period>
        </MajorCycle>
      </MajorCycleWrapper>


    </ChartWrapper>
  );
}