import React, { Fragment } from "react";
import { useSetState } from "react-use";
import { withStyles } from "@material-ui/styles";
import {
  Box,
  Grid,
  Paper,
  Theme,
  Typography,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { TaskEntity } from "../../models";
import shortid from "shortid";
import { grey } from "@material-ui/core/colors";

const DescriptionTextDone = withStyles((theme: Theme) => ({
  root: {
    textDecoration: "line-through",
    color: "grey"
  }
}))(ListItemText);

interface TaskProps {
  task: TaskEntity;
  handleTodoDelete: (id: string) => void;
  handleTodoDone: (id: string) => void;
  handleTodoUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

interface TaskListProps {
  handleTodoUpdate: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  handleTodoDelete: (id: string) => void;
  handleTodoDone: (id: string) => void;
  task: TaskEntity[];
}

interface TaskFormProps {
  task: TaskEntity[];
  handleTodoCreate: (task: TaskEntity) => void;
}

export function Task(props: TaskProps) {
  return (
    <Fragment>
      <ListItem key={props.task.id} button>
        <ListItemIcon>
          <Checkbox
            checked={props.task.done}
            onChange={() => props.handleTodoDone(props.task.id)}
            onClick={e => e.stopPropagation()}
            color="primary"
          />
        </ListItemIcon>
        {props.task.done ? (
          <DescriptionTextDone primary={props.task.description} />
        ) : (
          <ListItemText primary={props.task.description} />
        )}
        <ListItemIcon>
          <DeleteIcon onClick={() => props.handleTodoDelete(props.task.id)} />
        </ListItemIcon>
      </ListItem>
    </Fragment>
  );
}

// interface TaskListState {
//   //editTask: TaskEntity
//   loading: boolean;
//   saving: boolean;
//   //  loadingError: Error
//   // savingError: Error
//   deleting: boolean;
//   // deletingError: Error
//   tasks: TaskEntity[];
// }

export const TaskList = (props: TaskListProps) => {
  return (
    <List>
      {props.task.map(task => (
        <ListItem key={task.id}>
          <Task
            task={task}
            handleTodoUpdate={props.handleTodoUpdate}
            handleTodoDelete={props.handleTodoDelete}
            handleTodoDone={props.handleTodoDone}
          />
        </ListItem>
      ))}
    </List>
  );
};

export const TaskForm = (props: TaskFormProps) => {
  //Creates ref for form input
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Create state for form
  const [formState, setFormState] = React.useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // this will update the form with the new input value
    setFormState(event.target.value);
  }

  // This will check to see if the user hits enter!
  function handleInputEnter(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      const newTask: TaskEntity = {
        id: shortid.generate(),
        description: formState,
        done: false
      };

      //will make a new task
      props.handleTodoCreate(newTask);

      // resets the input field somehow ?????????????
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Put a task in me ;]"
      onChange={event => handleInputChange(event)}
      onKeyPress={event => handleInputEnter(event)}
    />
  );
};
