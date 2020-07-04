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

export type TagDialogProps = {
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
const TagDialog: React.FC<TagDialogProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = React.useState({
    tag: {
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
            error={formData.tag.error}
            helperText={formData.tag.errorInfo}
            margin="dense"
            id="tag"
            value={formData.tag.data}
            onChange={(e) => {
              setFormData({
                ...formData,
                tag: { error: false, errorInfo: "", data: e.target.value },
              });
            }}
            label="Add your tag here."
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFormData({
                ...formData,
                tag: {
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

export default TagDialog;
