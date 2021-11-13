import { taskColor } from 'components/utils/mocks';
import React, { FC, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

export interface IChartData {
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
    position: relative;
`;

const MajorCycleWrapper = styled.div`
  width: calc(100% - 100px);
  overflow-x: auto;
  height: 150px;
  position: absolute;
  padding: 0 25px;
  margin: 0 25px;
  display: flex;
`;

const MajorCycle = styled.div`
  display: flex;
  position: relative;
`;

const expandTask = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;


const TaskTile = styled.div<{ width: number; name: string }>`
  animation: ${expandTask} 2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  bottom: 0;
  opacity: .8;
  width: 100%;
  max-width: ${props => props.width * 20}px;
  background: ${props => taskColor[props.name]};
  z-index: 1;
  transition: all .4s ease-out;
  position: relative;
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
  align-items: end;
  position: relative;
  background: rgba(0, 0, 0, .05);
`;

const Period = styled.div<{ isEnd?: boolean }>`
  position: absolute;
  bottom: -1.25rem;
  margin: 0 0 0 -.5rem;
  align-self: flex-end;
  font-weight: 600;
  ${props => props.isEnd && css`
    right: 0;
  `}
`;

const ShowMoreButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-bottom: 1px solid #0009;
  color: #0009;
  background: white;
  transition: all .3s ease-in;
  margin: 0 0 1rem 0;

  :hover {
    color: black;
    border-bottom-color: black;
  }
`;

const UtilFactor = styled.div`
  position: absolute;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  background: #0001;
  top: 0;
  font-weight: 500;
  left: 50px;
  .util-factor {
    font-weight: 600;
  }
`;

interface IChartProps {
  data: IChartData | undefined;
  utilizationFactor: number;
}

export const Chart: FC<IChartProps> = ({ data, utilizationFactor }) => {
  const [cycles, setCycles] = useState<IChartData[]>([]);

  useEffect(() => {
    console.log('set cycles', data)
    setCycles(data ? [data] : []);
  }, [data])

  const addCycle = () => {
    setCycles([...cycles, cycles[0]]);
  }

  return (
    <ChartWrapper>
      {console.log(cycles.length)}
      {cycles?.[0]?.cycles.length > 0 &&
        <>
          <div className='header'>
            <h1 className='title'>Szeregowanie zadań cyklicznych</h1>
          </div>
          <ShowMoreButton onClick={addCycle}>Dodaj kolejny cykl</ShowMoreButton>
          <UtilFactor>
            <div>Współczynnik wykorzystania procesora:</div>
            <div className="util-factor">{utilizationFactor.toFixed(2)}</div>
          </UtilFactor>
        </>
      }
      <MajorCycleWrapper>
        {cycles.map((iteration, iterationIndex) => (

          <MajorCycle
            key={iterationIndex}
          >
            {iteration.cycles.map((cycle, cycleIndex) => (
              <MinorCycle
                key={cycle.from}
                width={cycle.to - cycle.from}
                isStart={cycle.from === 0}
                isEnd={cycle.to === iteration.majorCycle}
              >
                <Period>{cycle.from + (iterationIndex * iteration.majorCycle)}</Period>
                {cycle.tasks.map(task => (
                  <TaskTile
                    key={cycle.from + task.name}
                    width={task.to - task.from}
                    name={task.name}
                  >
                    {task.name}
                  </TaskTile>
                ))}
                {(iterationIndex === cycles.length - 1 && cycleIndex === iteration.cycles.length - 1) &&
                  <Period isEnd>{iteration.majorCycle + (iterationIndex * iteration.majorCycle)}</Period>
                }
              </MinorCycle>

            ))}
          </MajorCycle>
        ))
        }
      </MajorCycleWrapper>
    </ChartWrapper>
  );
}