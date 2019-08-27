import React from "react";
// import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

function getPage() {
  const rawURL = window.location.href;
  const re = /\/(?:[^/]+)$/;
  const resultArr = re.exec(rawURL);
  if (resultArr === null) return "/dashboard";
  return resultArr[0];
}

const tabsObj = {
  "/dashboard": "dashboard",
  "/chart": "chart",
  "/company": "company",
  "/financials": "financials",
  "/profile": "profile"
};

function Tab(props) {
  const { classes } = props;
  const page = tabsObj[getPage()];
  return (
    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
      <Button disabled style={{color: "white"}}>
        {page}
      </Button>
    </Typography>
  );
}

export default withStyles(styles)(Tab);

      // <Button color="inherit" component={Link} to={getPage()}>
