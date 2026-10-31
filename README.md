# Taskflow

A TypeScript task-management core that explores how to model application data, implement task operations, and handle errors with strong typing. The project includes an asynchronous in-memory repository, reusable task utilities, validation helpers, and a console demonstration.

The focus is the application logic behind a task-management system. The current implementation runs locally as a script, with no web interface or HTTP server.

## Project overview

Task-management applications need consistent rules for task data, updates, and missing records. Taskflow uses this domain to demonstrate TypeScript concepts in a small, modular codebase.

Tasks belong to projects and carry a title, status, priority, creator, optional assignee, and optional due date. Supporting interfaces model users, projects, workspaces, memberships, and comments, providing a foundation for further development.

## Implemented features

- Create tasks with generated UUIDs, a creation timestamp, and a default `TODO` status.
- List, find, update, and delete tasks through asynchronous repository functions.
- Apply partial updates to selected editable task fields.
- Filter task collections by status, assignee, or high priority.
- Assign and unassign tasks using helpers that return updated objects.
- Check status, priority, and basic task fields at runtime.
- Represent asynchronous success and failure with a typed result union.
- Define role-to-permission mappings for owners, admins, and members.
- Run a demonstration of seeding, lookup, creation, updates, and missing-task error handling.

## Technical skills demonstrated

| Concept | Implementation |
| --- | --- |
| Domain modeling | Interfaces for tasks and related application entities |
| Union types | Explicit task statuses, priorities, roles, and permissions |
| Utility types | `Omit`, `Pick`, and `Partial` derive creation and update inputs |
| Generics | Reusable lookup, property access, and result helpers |
| Type constraints | `keyof`, indexed access types, and `T extends HasId` |
| Type narrowing | Runtime guards for status, priority, and nonempty strings |
| Error modeling | Discriminated `ApiResult<T>` success/failure union |
| Asynchronous code | Promise-based repository operations and `safeExecute` |
| Immutable update patterns | Object spread, array copies, and `map` / `filter` |
| Strict compilation | TypeScript's `strict` option enabled |

## Code organization

| File | Responsibility |
| --- | --- |
| `src/models.ts` | Domain interfaces and status, priority, and role types |
| `src/task-types.ts` | Input types, summaries, and role-permission mappings |
| `src/task-repository.ts` | In-memory storage and asynchronous CRUD operations |
| `src/task-service.ts` | Collection filters and task-status transformations |
| `src/task-validation.ts` | Runtime checks for task-related values |
| `src/task-utils.ts` | Assignment, summaries, and nullable-field helpers |
| `src/generic-utils.ts` | Reusable typed lookup and property operations |
| `src/api-types.ts` | Result types and asynchronous error wrapper |
| `src/main.ts` | Runnable task-management demonstration |

The demo calls repository functions directly. Validation and result helpers are available as separate utilities; they are not automatically applied to every repository operation.

## Task model

| Field | Purpose |
| --- | --- |
| `id` | Generated task identifier |
| `projectId` | Associated project |
| `title` / `description` | Task content; description may be `null` |
| `status` | `TODO`, `IN_PROGRESS`, `REVIEW`, or `DONE` |
| `priority` | `LOW`, `MEDIUM`, `HIGH`, or `URGENT` |
| `assigneeId` | Assigned user, or `null` |
| `createdBy` / `createdAt` | Creator and creation time |
| `dueDate` | Optional deadline, represented as `Date` or `null` |

These status values describe the allowed states. The current code does not enforce a particular transition order.

## Run locally

Use Node.js 22 or newer and npm for these instructions. The repository does not declare a Node.js engine requirement; task creation uses the global `crypto.randomUUID()` API.

```bash
git clone https://github.com/Dhruvt1998/taskflow.git
cd taskflow
npm install
npx tsc
node dist/main.js
```

TypeScript compiles the files in `src/` into `dist/`, targeting ES2022 with NodeNext module settings.

The demonstration:

1. Seeds two example tasks.
2. Prints the stored tasks and lookup results, including a missing ID.
3. Creates a task and prints its generated ID, default status, and creation time.
4. Updates the new task's status and priority.
5. Catches and prints an error when requesting the title of a nonexistent task.

Task IDs and timestamps vary between runs. All data is kept in memory and is lost when the process exits.

## Example usage

The following can be used in a TypeScript file inside `src/`:

```typescript
import { createTask, updateTask } from "./task-repository";
import { safeExecute } from "./api-types";

async function example() {
  const result = await safeExecute(() =>
    createTask({
      projectId: "p1",
      title: "Document the task workflow",
      description: null,
      priority: "HIGH",
      assigneeId: null,
      createdBy: "u1",
      dueDate: null,
    })
  );

  if (result.success) {
    const updated = await updateTask(result.data.id, {
      status: "IN_PROGRESS",
    });
    console.log(updated.title, updated.status);
  } else {
    console.error(result.error);
  }
}

example().catch(console.error);
```

The `success` discriminator lets TypeScript narrow the result to either task data or an error message.

## Current scope

Taskflow implements the task-management logic and supporting type utilities. User, workspace, membership, project, and comment interfaces are data definitions; their complete workflows are not implemented. The permission map defines intended permissions but does not enforce authorization.

Storage is an in-memory array, and collection copies are shallow. Runtime validation helpers check selected fields rather than validating an entire task or enforcing repository input rules.

## Validation and next steps

Check the source types with:

```bash
npx tsc --noEmit
```

The current `npm test` script is a placeholder that exits with an error. No automated test suite is included, and compilation and execution were not verified during this documentation update.

Potential extensions include:

- Unit tests for CRUD operations, validation, and missing-record behavior.
- Persistent storage behind the repository functions.
- Integration of runtime validation into task creation and updates.
- Enforcement of role permissions and task-transition rules.
- An HTTP API or user interface built on the existing core.

## License

The package metadata declares the ISC license. No standalone license file was found in the inspected repository.
