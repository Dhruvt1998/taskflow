export interface User {
    id: string;
    name: string;
    email: string;
    active: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    createdBy: string;
    createdAt: Date;
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: string | null;
    createdBy: string;
    createdAt: Date;
    dueDate: Date | null;
}

export interface Comment {
    id: string;
    taskId: string;
    userId: string;
    content: string;
    createdAt: Date;
}

export interface Membership {
    id: string;
    userId: string;
    workspaceId: string;
    role: UserRole;
    joinedAt: Date;
}

export interface Workspace {
    id: string;
    name: string;
    description: string | null;
    createdBy: string;
    createdAt: Date;
}

export interface Assignee {
    id: string;
    name: string;
    profile?: {
        avatarUrl?: string;
    };
}

export type ProjectStatus =
    | "ACTIVE"
    | "ARCHIVED";

export type TaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "REVIEW"
    | "DONE";

export type TaskPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "URGENT";

export type UserRole =
    | "OWNER"
    | "ADMIN"
    | "MEMBER";
