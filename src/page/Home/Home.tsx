import React from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/styles";
import { Theme, Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import TaskDialog from "./component/TaskDialog";
import TagDialog from "./component/TagDialog";
import AppToolBar from "./component/AppToolBar";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AppDrawer from "./component/AppDrawer";

type State = {
  loading: boolean;
  error?: any;
  resolved: boolean;
  taskDialog: boolean;
  tagDialog: boolean;
  drawerOpen: boolean;
};

type Props = {};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap",
    },
    drawerContainer: {
      marginTop: theme.spacing(8),
    },
    listItems: {
      padding: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2),
      },
    },
    listItemsSel: {
      background: theme.palette.secondary.dark,
      padding: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2),
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      background: theme.palette.background.default,
      height: "100vh",
      overflowX: "scroll",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  });

class Home extends React.Component<Props & WithStyles<typeof styles>, State> {
  readonly state: State = {
    loading: true,
    error: false,
    resolved: false,
    taskDialog: false,
    tagDialog: false,
    drawerOpen: false,
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

  handleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { drawerOpen } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppToolBar
          title="Swiggy-Test"
          handleDrawer={this.handleDrawer}
          drawerOpen={drawerOpen}
        />
        <AppDrawer drawerOpen={drawerOpen}>
          <div className={classes.drawerContainer}>
            <List>
              <ListItem className={classes.listItems} button key={"profile"}>
                <ListItemAvatar
                  children={
                    <Avatar
                      alt="Ashish Chaudhary"
                      src="/static/images/avatar/1.jpg"
                    />
                  }
                />
                <ListItemText primary="Profile" />
              </ListItem>
            </List>
            <Divider />
          </div>
        </AppDrawer>
        <main className={classes.content} id="mainview">
          <div className={classes.toolbar} />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAddTask}
          >
            {"Add Task"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAddTag}
          >
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
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
