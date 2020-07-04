import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogRoot: {},
    textField: {
      marginTop: theme.spacing(2),
    },
  })
);

export type TaskDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const handleValidate = (data: {
  [key: string]: { data: string; error: boolean; errorInfo: string };
}) => {
  let returnValue = { ...data };
  let isError = false;
  if (!data.task.data || data.task.data.trim().length === 0) {
    returnValue.task.error = true;
    returnValue.task.errorInfo = "Task cannot be empty string.";
    isError = true;
  }
  if (!data.startTime.data) {
    returnValue.startTime.error = true;
    returnValue.startTime.errorInfo = "Please add start time of task.";
    isError = true;
  }
  if (!data.endTime.data) {
    returnValue.endTime.error = true;
    returnValue.endTime.errorInfo = "Please add end time of task.";
    isError = true;
  }
  if (new Date(data.startTime.data) > new Date(data.endTime.data)) {
    returnValue.endTime.error = true;
    returnValue.endTime.errorInfo = "Start time must be before end time.";
    isError = true;
  }
  return { returnValue, isError };
};
const TaskDialog: React.FC<TaskDialogProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = React.useState({
    task: {
      data: "",
      error: false,
      errorInfo: "",
    },
    startTime: {
      data: "",
      error: false,
      errorInfo: "",
    },
    endTime: {
      data: "",
      error: false,
      errorInfo: "",
    },
  });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={formData.task.error}
            helperText={formData.task.errorInfo}
            margin="dense"
            id="task"
            value={formData.task.data}
            onChange={(e) => {
              setFormData({
                ...formData,
                task: { error: false, errorInfo: "", data: e.target.value },
              });
            }}
            label="Add your task here."
            fullWidth
          />
          <TextField
            error={formData.startTime.error}
            helperText={formData.startTime.errorInfo}
            id="datetime-local-start"
            label="Start DateTime"
            type="datetime-local"
            className={classes.textField}
            value={formData.startTime.data}
            onChange={(e) => {
              setFormData({
                ...formData,
                startTime: {
                  error: false,
                  errorInfo: "",
                  data: e.target.value,
                },
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            error={formData.endTime.error}
            helperText={formData.endTime.errorInfo}
            id="datetime-local-end"
            label="End DateTime"
            type="datetime-local"
            className={classes.textField}
            value={formData.endTime.data}
            onChange={(e) => {
              setFormData({
                ...formData,
                endTime: {
                  data: e.target.value,
                  error: false,
                  errorInfo: "",
                },
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFormData({
                ...formData,
                task: {
                  data: "",
                  error: false,
                  errorInfo: "",
                },
                startTime: {
                  data: "",
                  error: false,
                  errorInfo: "",
                },
                endTime: {
                  data: "",
                  error: false,
                  errorInfo: "",
                },
              });
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const res = handleValidate(formData);
              if (res.isError) {
                setFormData({ ...formData, ...res.returnValue });
              } else {
                handleClose();
              }
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskDialog;
