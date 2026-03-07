# TODO Workspace

Use this folder to define implementation work in a format that can be directly executed into code.

## Structure

- `tasks/templates/task.todo.template.md`: Template for one task.
- `tasks/<task-slug>/todo.md`: One TODO directory per task.
- `tasks/index.md`: Quick status board across tasks.

## Workflow

1. Create a task directory in `tasks/<task-slug>/`.
2. Copy `tasks/templates/task.todo.template.md` to `tasks/<task-slug>/todo.md`.
3. Keep each task small and implementation-ready.
4. Include target files and acceptance checks.
5. Mark a task `[in-progress]` when coding starts.
6. Mark a task `[done]` only after validation.

## Task Status

Use these values in each task:
- `[backlog]` not started yet
- `[todo]` not started
- `[in-progress]` being implemented
- `[blocked]` waiting on input/dependency
- `[done]` completed and validated

## Notes

- One directory per task is recommended.
- This format is designed so implementation can be generated from TODO files with minimal follow-up questions.
- Read branch and create new branch for the task.
