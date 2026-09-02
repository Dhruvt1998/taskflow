import type {Task, TaskStatus} from "./models";

let tasks: Task[] = [];
export async function findAllTasks():
    Promise<Task[]> {
    return [...tasks];
}

export async function  findTask(
    id : string
): Promise<Task | undefined>{
    return tasks.find(tasks => tasks.id === id);
}

export async function createTask(
    task : Task
): Promise<Task>{
   if(await findTask(task.id)){
       throw new Error("Task already exists");
   }
   tasks = [...tasks, task];
   return task;
}

export async function deleteTask(
    id : string
): Promise<void>{
    const task = await findTask(id);
    if (!task){
        throw new Error("Task not found");
    }
    tasks = tasks.filter(task => task.id !== id);
}

export async function changeTaskStatus(
    id : string,
    status : TaskStatus
): Promise<Task>{
    const task = await findTask(id)
    if(!task){
        throw new Error("Task not found");
    }
    const updatedTask = {...task,status};
    tasks = tasks.map(createTask => createTask.id === id ? updatedTask : createTask);
    return updatedTask;
}

export async function seedTask(
    initialTasks : Task[]
): Promise<void>{
    tasks = [...initialTasks]
}