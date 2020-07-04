import React from "react";
import { WithStyles, createStyles, withStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { types } from "@babel/core";

type State = {
  loading: boolean;
  error?: any;
  resolved: boolean;
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
  };
  render() {
    return <div>Home Page</div>;
  }
}

export default withStyles(styles)(Home);
