import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";

const Navigation = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                component={Link}
                to="/"
                variant="contained"
              >
                Home
              </Button>
            </Grid>
           
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navigation;