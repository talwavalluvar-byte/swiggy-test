import React from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Button } from "@material-ui/core";
import TaskDialog from "./component/TaskDialog";
import TagDialog from "./component/TagDialog";

type State = {
  loading: boolean;
  error?: any;
  resolved: boolean;
  taskDialog: boolean;
  tagDialog: boolean;
};

type Props = {};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  });

class Home extends React.Component<Props & WithStyles<typeof styles>, State> {
  readonly state: State = {
    loading: true,
    error: false,
    resolved: false,
    taskDialog: false,
    tagDialog: false,
  };

  handleAddTask = () => {
    this.setState({ taskDialog: true });
  };

  handleAddTaskClose = () => {
    this.setState({ taskDialog: false });
  };

  handleAddTag = () => {
    this.setState({ tagDialog: true });
  };

  handleAddTagClose = () => {
    this.setState({ tagDialog: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleAddTask}
        >
          {"Add Task"}
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleAddTag}>
          {"Add Tags"}
        </Button>
        <TaskDialog
          open={this.state.taskDialog}
          handleClose={this.handleAddTaskClose}
        />
        <TagDialog
          open={this.state.tagDialog}
          handleClose={this.handleAddTagClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
