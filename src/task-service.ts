import {Task, TaskStatus} from "./models";

export function findTaskById(
    tasks: Task[],
    id: string
): Task | undefined {
   return  tasks.find(task => task.id === id)
}

export function getTasksByStatus(
    tasks: Task[],
    status: TaskStatus
): Task[] {
    return  tasks.filter(task => task.status === status)
}

export function getTasksByAssignee(
    tasks: Task[],
    userId: string
): Task[] {
    return  tasks.filter(task => task.assigneeId === userId)
}

export function getHighPriorityTasks(
    tasks: Task[]
): Task[] {
    return  tasks.filter(task => task.priority === "HIGH" || task.priority === "URGENT")
}

export function updateTaskStatus(
    tasks: Task[],
    taskId: string,
    status: TaskStatus
): Task[] {
    return tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                status
            }
        }
        return task
    });
}