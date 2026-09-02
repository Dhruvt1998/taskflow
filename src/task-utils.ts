import {Task, Assignee} from "./models";

export function getTaskSummary(
    task: Task
): string {
    const {
        title,
        priority,
        status
    } = task;
    return `${title}  [${priority}] - ${status}`
}

export function getTaskDescription(
    task: Task
): string {
    return task.description ?? "No description";
}

export function assignTask(
    task: Task,
    userId: string
): Task {
    return {...task,
    assigneeId : userId}
}

export function unassignTask(
    task: Task
): Task {
    return {
        ...task,
        assigneeId : null
    }
}

export function cloneTasks(
    tasks: Task[]
): Task[] {
    return [...tasks]
}

export function getAssigneeAvatar(
    assignee: Assignee | null
): string {
    return assignee?.profile?.avatarUrl ?? "/default-avatar.png"
}