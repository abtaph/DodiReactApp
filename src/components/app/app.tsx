import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { Task, TaskForm, TaskList } from "../todo/tasklist";
import { TaskEntity } from "../../models/Task-Entity";
import ReactDom from "react-dom";
const theme = createMuiTheme({
  typography: {
    fontSize: 11
  },
  spacing: 8
});

export function App() {
  const [todos, setTodos] = React.useState<TaskEntity[]>([]);

  function handleTodoCreate(task: TaskEntity) {
    const newTodoState: TaskEntity[] = [...todos];

    newTodoState.push(task);
    // updates the todo state!!
    setTodos(newTodoState);
  }

  function handleTodoUpdate(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    // Prepare new todos state
    const newTodoState: TaskEntity[] = [...todos];

    // Find the right task to update
    newTodoState.find((todo: TaskEntity) => todo.id === id)!.description =
      event.target.value;

    // update task state
    setTodos(newTodoState);
  }

  function handleTodoDelete(id: string) {
    // prepare new todos state
    const newTodoState: TaskEntity[] = todos.filter(
      (todo: TaskEntity) => todo.id !== id
    );

    setTodos(newTodoState);
  }

  function handleToDoComplete(id: string) {
    //copy current todos state
    const newTodoState: TaskEntity[] = [...todos];

    // find the correct todo item and update 'done' key
    newTodoState.find(
      (todo: TaskEntity) => todo.id === id
    )!.done = !newTodoState.find((todo: TaskEntity) => todo.id === id)!.done;
    setTodos(newTodoState);
  }

  return (
    <div>
      <TaskForm task={todos} handleTodoCreate={handleTodoCreate} />
      <TaskList
        task={todos}
        handleTodoDelete={handleTodoDelete}
        handleTodoDone={handleToDoComplete}
        handleTodoUpdate={handleTodoUpdate}
      />
    </div>
  );
}
