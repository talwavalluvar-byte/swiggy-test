import React from "react";
import { Theme, createStyles } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    themeBackground: {
      background: theme.palette.background.default,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
  });

export type AppDrawerBarProps = {
  drawerOpen: boolean;
  children: React.ReactNode;
};

const AppDrawerBar: React.FC<AppDrawerBarProps & WithStyles<typeof styles>> = ({
  classes,
  drawerOpen,
  children,
}) => {
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.themeBackground]: true,
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      {children}
    </Drawer>
  );
};

export default withStyles(styles)(AppDrawerBar);
