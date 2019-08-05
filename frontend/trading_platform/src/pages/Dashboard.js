import React from "react";
import SetChart from "../components/graphs/SetChart";
import SetNews from "../components/news/SetNews";
import Grid from "@material-ui/core/Grid";

class Dashboard extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={8}
        style={{padding: 10, position: "relative", zIndex: 1 }}
      >
        <Grid item xs={7}>
          <SetChart />
        </Grid>
        <Grid item xs={5}>
          <SetNews />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
