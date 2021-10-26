import { IChartData } from "components/core/Chart"

export const taskColor: any = {
  z1: 'green',
  z2: 'red',
  z3: 'orange',
  z4: 'blue',
  z5: 'pink'
}

export const mockInputData = [
  {
    name: 'a',
    execTime: 8,
    period: 25,
    relativeDeadline: 25,
    releaseTime: 0 // may be irrelevant?
  }, {
    name: 'b',
    execTime: 8,
    period: 50,
    relativeDeadline: 100,
    releaseTime: 0 // may be irrelevant? 
  }, {
    name: 'c',
    execTime: 8,
    period: 100,
    relativeDeadline: 100,
    releaseTime: 0 // may be irrelevant? 
  }
]

export const mockChartkData: IChartData = {
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