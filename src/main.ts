import type { Task }  from "./models";

import {
    seedTasks,
    findAllTasks,
    findTask,
    createTask,
    deleteTask,
    changeTaskStatus,
    getTaskTitle,
    updateTask
} from "./task-repository";

const initialTasks : Task[] = [
    {
        id: "t1",
        projectId : "p1",
        title : "Create login page",
        description : "Build authentication UI",
        status : "TODO",
        priority : "HIGH",
        assigneeId : "u1",
        createdBy : "u2",
        createdAt : new Date(),
        dueDate : null
    },
    {
        id : "t2",
        projectId : "p1",
        title : "Create database schema",
        description : null,
        status : "IN_PROGRESS",
        priority : "URGENT",
        assigneeId : null,
        createdBy : "u2",
        createdAt : new Date(),
        dueDate : null
    }
]

async function main() {
    await seedTasks(initialTasks);

    console.log(await findAllTasks());

    const task = await findTask("t1");

    console.log(task);

    const  task2 = await findTask("xyz");

    console.log(task2);

    const createdTask = await createTask({
            projectId : "p1",
            title : "Create database schema",
            description : null,
            priority : "URGENT",
            assigneeId : null,
            createdBy : "u2",
            dueDate : null
    })

    console.log(createdTask.id);
    console.log(createdTask.status);
    console.log(createdTask.createdAt);

    console.log(await findAllTasks());

    const updatedTask = await updateTask(createdTask.id, {status:"IN_PROGRESS", priority:"HIGH"});

    console.log(updatedTask);

    //await  deleteTask(createdTask.id);

    console.log(await findAllTasks());

    try{
        const title = await getTaskTitle("xyz");
        console.log(title);
    }catch (error){
        if (error instanceof Error){
            console.log(`Error: ${error.message}`);
        }
    }
}

main();