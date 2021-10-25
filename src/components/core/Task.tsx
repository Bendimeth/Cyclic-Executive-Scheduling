export interface ITask{
    name: string,
    period: number,
    processingTime: number
    deadline:number,
}

export class TaskGroup{
    taskList: Array<ITask> = [];
    minPeriod: number = 0;
    maxPeriod: number = 0;

    public SetTaskList(tlIN:Array<ITask>){
        this.taskList = tlIN;
        this.CalculateMinMaxPeriod();
    }

    private CalculateMinMaxPeriod(){
        let min: number = 1000000;
        let max: number = -1;

        for(var t of this.taskList){
            if(t.period < min){
                min = t.period;
            }

            if(t.period > max){
                max = t.period;
            }
        }

        console.log("min: " + min);
        console.log("max: " + max);
    }
}