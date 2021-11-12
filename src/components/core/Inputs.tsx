import React, { ChangeEvent, FC, useState } from "react"
import { ITask } from "./Task"

interface IInputProps {
  setData: (data: ITask[]) => void;
}

export const Inputs: FC<IInputProps> = ({ setData }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addInputHandler = () => {
    setTasks([
      ...tasks,
      {
        name: `z${tasks.length + 1}`,
        period: 0,
        processingTime: 0,
        deadline: 0
      }
    ])
  }

  const updateInputValue = (inputIdx: number, field: string, event: ChangeEvent<HTMLInputElement>) => {
    const isTitle = field === 'name';
    const value = event.target.value;
    setTasks(tasks.map((el, idx) => idx === inputIdx ?
      {
        ...el,
        [field]: isTitle ? value : Number(value)
      } : el))
  }

  const renderChart = () => {
    setData(tasks);
  }

  return (
    <div>
      {tasks.map((el, idx) => (
        <div key={el.name}>
          <span>{el.name}</span>
          <input
            type="text"
            value={el.processingTime}
            onChange={(event) => updateInputValue(idx, 'processingTime', event)}
          />
          <input
            type="text"
            value={el.period}
            onChange={(event) => updateInputValue(idx, 'period', event)}
          />
          <input
            type="text"
            value={el.deadline}
            onChange={(event) => updateInputValue(idx, 'deadline', event)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addInputHandler}
      >
        Add
      </button>
      <button
        type="button"
        onClick={renderChart}
      >
        Render
      </button>
    </div>
  )
}