import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CountryPicker from "./CountryPicker";

const Nav = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Earth in Numbers
          </Typography>
          <CountryPicker />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));
