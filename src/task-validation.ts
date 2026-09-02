import {TaskStatus, TaskPriority} from "./models";

export function isTaskStatus(
    value: unknown
): value is TaskStatus {
    return (
        value === "TODO" ||
        value === "IN_PROGRESS" ||
        value === "REVIEW" ||
        value === "DONE"
    );
}

export function isTaskPriority(
    value : unknown
): value is TaskPriority {
    return (
        value === "LOW" ||
        value === "MEDIUM" ||
        value === "HIGH" ||
        value === "URGENT"
    );
}

export function isNonEmptyString(
    value : unknown
): value is string {
    return (typeof value === "string" &&
        value.trim() !== ""
    );
}

export function isBasicTask(
    value : unknown
): boolean {
    return (
        typeof value === "object" &&
            value !== null &&
            "title" in value &&
            isNonEmptyString(value.title) &&
            "status" in value &&
            isTaskStatus(value.status) &&
            "priority" in value &&
            isTaskPriority(value.priority)
    );
}