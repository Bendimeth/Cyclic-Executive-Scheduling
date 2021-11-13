import { MathJax, MathJaxContext } from "better-react-mathjax";
import { taskColor } from "components/utils/mocks";
import React, { ChangeEvent, FC, useState } from "react"
import styled from "styled-components";
import { ITask } from "./Task"

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 30px auto;
  padding: 20px 80px;
  border-radius: 5px;
  background: rgba(0, 0, 0, .03);
  position: relative;
`;

const InputsHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 0 .5rem 0;
`;

const SingleElementWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  padding: .5rem;
  border-radius: 5px;
  background: #0001;
  margin: 0 0 .5rem 0;
  align-items: center;
`;

const Input = styled.input`
  width: 50px;
  border: none;
  border-bottom: 1px solid black;
`;

const TaskName = styled.div`
  font-weight: 600;
  position: absolute;
  left: -30px;
`;

const TaskColor = styled.div<{ bgColor: string }>`
  width: 25px;
  height: 25px;
  opacity: .9;
  border-radius: 5px;
  background: ${props => props.bgColor};
  box-shadow: 0 2px 2px ${props => props.bgColor};
  position: absolute;
  right: -40px;
`;

const AddButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  left: 10px;
  top: 10px;
  border: none;
  text-decoration: none;
  font-weight: 500;
  color:  rgba(0,0,255, .8);
  box-shadow: 0 2px 2px  rgba(0,0,255, .2);
  border-radius: 50%;
  transition: .3s ease-in all;
  cursor: pointer;
  background: white;
  :hover {
    box-shadow: 0 0 3px 2px  rgba(0,0,255, .2);
  }
`;

const RenderButton = styled.button<{ disabled: boolean }>`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: 600;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background: rgba(0,0,0, .1);
  margin: .5rem auto 0 auto;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  font-weight: 500;
  font-size: 12px;
  left: 0px;
  padding: 3px 5px;
  bottom: -30px;
  border: 1px solid rgba(255, 0, 0, .5);
  background: rgba(255, 0, 0, .1);
  border-radius: 5px;
  cursor: pointer;
`;

interface IInputProps {
  setData: (data: ITask[]) => void;
}

export const Inputs: FC<IInputProps> = ({ setData }) => {
  const [tasks, setTasks] = useState<ITask[]>([{
    name: 'z1',
    period: 0,
    processingTime: 0,
    deadline: 0
  }]);

  const addInputHandler = () => {
    tasks.length < 10 && setTasks([
      ...tasks,
      {
        name: `z${tasks.length + 1}`,
        period: 0,
        processingTime: 0,
        deadline: 0
      }
    ])
  }

  const deleteItem = () => {
    setTasks([...tasks].slice(0, -1));
  }

  const updateInputValue = (inputIdx: number, field: string, event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setTasks(tasks.map((el, idx) => idx === inputIdx ?
        {
          ...el,
          [field]: value
        } : el))
    }
  }

  const renderChart = () => {
    setData([...tasks]);
  }

  return (
    <InputsWrapper>
      <InputsHeader>
        <MathJaxContext>
          <div>
            <MathJax>{"\\(\\ p_{i}\\)"}</MathJax>
          </div>
          <div>
            <MathJax>{"\\(\\ T_{i}\\)"}</MathJax>
          </div>
          <div>
            <MathJax>{"\\(\\ d_{i}\\)"}</MathJax>
          </div>
        </MathJaxContext>
      </InputsHeader>
      {tasks.map((el, idx) => (
        <SingleElementWrapper key={el.name}>
          <TaskName>{el.name}</TaskName>
          <Input
            type="text"
            value={el.processingTime}
            onChange={(event) => updateInputValue(idx, 'processingTime', event)}
          />
          <Input
            type="text"
            value={el.period}
            onChange={(event) => updateInputValue(idx, 'period', event)}
          />
          <Input
            type="text"
            value={el.deadline}
            onChange={(event) => updateInputValue(idx, 'deadline', event)}
          />
          <TaskColor
            bgColor={taskColor[el.name]}
          ></TaskColor>
          {(tasks?.length > 1 && idx === tasks.length - 1) &&
            <DeleteButton onClick={deleteItem}>Usuń</DeleteButton>
          }
        </SingleElementWrapper>
      ))}
      <AddButton
        type="button"
        onClick={addInputHandler}
      >
        +
      </AddButton>
      <RenderButton
        type="button"
        disabled={false}
        onClick={renderChart}
      >
        Rysuj wykres
      </RenderButton>
    </InputsWrapper>
  )
}