import React from "react";
import SetChart from "../components/graphs/SetChart";
import Grid from "@material-ui/core/Grid";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Grid style={{margin: "10px"}} container spacing={8}>
          <SetChart />
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
