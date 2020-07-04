import React from "react";
import { Theme, createStyles, IconButton } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/styles";
import { AppThemeConsumer } from "src/utils/theme";
import Brightness7SharpIcon from "@material-ui/icons/Brightness7Sharp";
import Brightness2SharpIcon from "@material-ui/icons/Brightness2Sharp";
import { yellow } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
  createStyles({
    sunStyle: {
      color: yellow["A200"],
    },
    moonStyle: {
      color: "white",
    },
  });

const ThemeSwitchButton: React.FC<WithStyles<typeof styles>> = ({
  classes,
}) => {
  return (
    <AppThemeConsumer>
      {({ changeThemeMode, mode }) => {
        return (
          <IconButton
            aria-label="Theme Mode Button"
            size="medium"
            onClick={(e) => {
              if (changeThemeMode) {
                if (mode === "default") {
                  changeThemeMode("dark");
                } else {
                  changeThemeMode("default");
                }
              }
            }}
          >
            {mode === "default" ? (
              <Brightness7SharpIcon
                fontSize="inherit"
                className={classes.sunStyle}
              />
            ) : (
              <Brightness2SharpIcon
                fontSize="inherit"
                className={classes.moonStyle}
              />
            )}
          </IconButton>
        );
      }}
    </AppThemeConsumer>
  );
};

export default withStyles(styles)(ThemeSwitchButton);
