import React from "react";
import {
  Theme,
  createStyles,
  Toolbar,
  IconButton,
  Typography,
  AppBar,
} from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ThemeSwitchButton from "./ThemeSwitchButton";

const styles = (theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    themeBtn: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        width: "auto",
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  });

export type AppToolBarProps = {
  title: string;
  handleDrawer: () => void;
  drawerOpen: boolean;
};

const AppToolBar: React.FC<AppToolBarProps & WithStyles<typeof styles>> = ({
  classes,
  title,
  handleDrawer,
  drawerOpen,
}) => {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          onClick={handleDrawer}
          color="inherit"
          aria-label="open drawer"
        >
          {!drawerOpen ? <MenuIcon /> : <ArrowBackIcon />}
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          {title}
        </Typography>
        <div className={classes.themeBtn}>
          <ThemeSwitchButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default withStyles(styles)(AppToolBar);
