import { Interface } from "readline";
import { IChartData } from "./Chart";

export interface ITask {
  name: string,
  period: number,
  processingTime: number
  deadline: number,
}

export class IPartPeriod {
  id: number;
  maxCapacity: number;
  tasks: Array<ITask> = [];

  constructor(idIn: number, maxCapacityIn: number) {
    this.id = idIn;
    this.maxCapacity = maxCapacityIn;
  }

  public CheckFreeSpace(exeTime: number) {
    let currentSize = 0;

    for (var t of this.tasks) {
      currentSize += t.processingTime;
    }

    return !(exeTime + currentSize > this.maxCapacity);
  }
}

export class TaskGroup {
  taskList: Array<ITask> = [];
  partPeriods: Array<IPartPeriod> = [];
  minPeriod: number = 0;
  maxPeriod: number = 0;

  constructor(tlIn: Array<ITask>) {
    this.SetTaskList(tlIn);
  }

  public SetTaskList(tlIN: Array<ITask>) {
    this.taskList = tlIN;
    this.SerializationCondition();
    this.CalculateMinMaxPeriod();
    this.TaskToPartPeriod();
  }

  private SerializationCondition() {
    let n = 0;

    for (var t of this.taskList) {
      n += t.processingTime / t.period;
    }

    console.log("Seria cond: " + n);

    if (n > 1) {
      throw new Error("Seria cond > 1");
    }
  }

  private CalculateMinMaxPeriod() {
    let min: number = 1000000;
    let max: number = -1;

    for (var t of this.taskList) {
      if (t.period < min) {
        min = t.period;
      }

      if (t.period > max) {
        max = t.period;
      }
    }

    console.log("min: " + min);
    console.log("max: " + max);

    for (var t of this.taskList) {
      if (max % t.period !== 0) {
        console.error('Max % period != 0');
        // throw new Error('Max % period != 0');
      }
    }

    this.minPeriod = min;
    this.maxPeriod = max;
  }

  private TaskToPartPeriod(): void {
    this.taskList.sort((a, b) => a.period - b.period);
    console.log(this.taskList);
    const numberOfPartPeriods: number = this.maxPeriod / this.minPeriod;
    console.log(numberOfPartPeriods);

    for (let i = 0; i < numberOfPartPeriods; i++) {
      this.partPeriods.push(new IPartPeriod(i, this.minPeriod));
    }

    for (var t of this.taskList) {

      let index = 1;

      for (var part of this.partPeriods) {
        const timeRange = this.minPeriod * index;

        if (t.period === this.maxPeriod && part.CheckFreeSpace(t.processingTime)) {
          part.tasks.push(t);
          index++;
          break;
        }
        else if ((timeRange % t.period === 0) && part.CheckFreeSpace(t.processingTime)) {
          part.tasks.push(t);
        }

        index++;
      }
    }

    console.log(this.partPeriods);
  }

  public PrepairChartData(): IChartData {
    interface IRange {
      from: number;
      to: number;
    }
    interface ISingleTask extends IRange {
      name: string;
    }
    interface ISingleCycle extends IRange {
      tasks: ISingleTask[];
    }

    const cycles: ISingleCycle[] = this.partPeriods.map((part, idx) => {
      const tasks: ISingleTask[] = part.tasks.map((task, taskIdx, arr) => {
        const from = idx * this.minPeriod + arr.slice(0, taskIdx).reduce((acc, el) => (acc + el.processingTime), 0);
        return ({
          from,
          to: from + task.processingTime,
          name: task.name
        });
      });
      return ({
        from: idx * this.minPeriod,
        to: (idx + 1) * this.minPeriod,
        tasks
      });
    });

    return {
      majorCycle: this.maxPeriod,
      cycles
    };
  }
}