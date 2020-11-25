import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import { green, orange } from "@material-ui/core/colors";
import "fontsource-roboto";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #fe6b8b, #000)",
    border: 0,
    borderRadius: 15,
    marginBottom: 15,
    color: "white",
    padding: "5px 30px",
  },
});

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 15,
    },
  },
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: green[400],
    },
  },
});

function ButtonStyled() {
  const classes = useStyles();
  return <Button className={classes.root}>Test styled Button</Button>;
}

function CheckboxExample() {
  const { checked, setChecked } = React.useState(true);
  return (
    <FormControlLabel
      control={
        <Checkbox
          inputProps={{ "aria-label": "secondary checkbox checked" }}
          color="primary"
          icon={<DeleteIcon />}
          checkedIcon={<SaveIcon />}
          checked={checked}
          onChecked={(e) => setChecked(e.target.checked)}
        />
      }
      label="Testing check box"
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <div className="App">
          <header className="App-header">
            <AppBar color="transparent">
              <Toolbar>
                <IconButton>
                  <MenuIcon color="primary" />
                </IconButton>
                <Typography variant="h6">MUI themeing</Typography>
                <Button color="primary">Login</Button>
              </Toolbar>
            </AppBar>
            <Typography variant="h2">Welcome to material UI</Typography>
            <img src={logo} className="App-logo" alt="logo" />
            <ButtonStyled />
            <TextField
              variant="filled"
              color="secondary"
              type="email"
              label="The time"
              placeholder="as@ahm4d.com"
            />
            <CheckboxExample />
            <Grid container spacing={1} justify="center">
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%", marginBottom: 5 }} />
              </Grid>
              <Grid item xs={5} sm={6}>
                <Paper style={{ height: 75, width: "100%", marginBottom: 5 }} />
              </Grid>
              <Grid item xs={3} sm={6}>
                <Paper style={{ height: 75, width: "100%", marginBottom: 5 }} />
              </Grid>
            </Grid>
            <ButtonGroup>
              <Button
                startIcon={<SaveIcon />}
                size="large"
                style={{ fontSize: 24 }}
                href="#"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                endIcon={<DeleteIcon />}
                size="large"
                style={{ fontSize: 24 }}
                onClick={() => alert("Hello!")}
                variant="contained"
                color="secondary"
              >
                delete
              </Button>
            </ButtonGroup>
          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
