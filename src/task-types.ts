import type {Task, UserRole} from "./models";

export type CreateTaskInput = 
    Omit<Task, "id" | "status" | "createdAt">

export type UpdateTaskInput = 
    Partial<
        Pick<Task, "title" | "description" | "status" | "priority"| "assigneeId" | "dueDate">
    >

export type TaskSummary = 
    Pick<Task, "id" | "title" | "status" | "priority">

export type Permission = 
    | "PROJECT_CREATE" | "PROJECT_DELETE" | "TASK_CREATE" | "TASK_EDIT" | "TASK_DELETE" | "MEMBER_MANAGE";

export const rolePermissions: Record<UserRole, Permission[]> = {
    OWNER: [
        "PROJECT_CREATE",
        "PROJECT_DELETE",
        "TASK_CREATE",
        "TASK_EDIT",
        "TASK_DELETE",
        "MEMBER_MANAGE"
    ],

    ADMIN: [
        "PROJECT_CREATE",
        "TASK_CREATE",
        "TASK_EDIT",
        "TASK_DELETE",
        "MEMBER_MANAGE"
    ],

    MEMBER: [
        "TASK_CREATE",
        "TASK_EDIT"
    ]
}

export interface ApiResponse<T> {
    success : boolean;
    data : T;
    message? : string;
}

export const exampleTaskResponse : ApiResponse<TaskSummary> = {
    success : true,
    data : {
        id : "t1",
        title : "Implement authentication",
        status : "IN_PROGRESS",
        priority : "HIGH"
    },
    message : "Task loaded successfully"
}

export function getFirst<T>(
    values : T[]
): T | undefined {
    return values[0];
}