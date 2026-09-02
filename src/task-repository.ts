import type {Task, TaskStatus} from "./models";
import {CreateTaskInput, UpdateTaskInput} from "./task-types";

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
    input : CreateTaskInput
): Promise<Task>{
    const task: Task = {
        ...input,
        id : crypto.randomUUID(),
        status : "TODO",
        createdAt : new Date()
    };
    tasks = [...tasks, task]
    return task
   /*if(await findTask(input.id)){
       throw new Error("Task already exists");
   }
   tasks = [...tasks, task];
   return task;*/
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
    return updateTask(id,{status});
}

export async function seedTasks(
    initialTasks : Task[]
): Promise<void>{
    tasks = [...initialTasks]
}

export async function getTaskTitle(
    id : string
): Promise<string>{
    const task = await findTask(id);

    if(!task){
        throw new Error("Task not found");
    }

    return task.title;
}

export async function updateTask(
    id : string,
    input : UpdateTaskInput
): Promise<Task>{
    const task = await findTask(id);
    if(!task){
        throw new Error("Task not found");
    }
    const updatedTask : Task = {
        ...task,
        ...input
    };
    tasks = tasks.map(task => task.id === id ? updatedTask : task);
    return updatedTask;
}