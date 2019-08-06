import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions/iexAction";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 300,
    height: 300,
    overflowY: "auto"
  },
  title: {
    fontSize: 24
  },
  description: {
    marginTop: 10
  }
};

class CompanyProfile extends React.Component {
  componentDidMount() {
    this.getProfile(this.props.multi);
  }

  componentDidUpdate(prevProps) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getProfile(multi);
      }
    }
  }

  getProfile = symbol => {
    this.props.getProfile(symbol[0].value);
  };

  render() {
    const { profile, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <b>Company Profile</b>
          </Typography>
          <Divider />
          <Typography color="textSecondary">
            Sector: {profile.sector}
          </Typography>
          <Typography color="textSecondary">
            Industry: {profile.industry}
          </Typography>
          <Typography color="textSecondary">
            Employees: {profile.employees}
          </Typography>
          <Typography
            className={classes.description}
            component="p"
            gutterBottom
          >
            {profile.description}
          </Typography>
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            View Website
          </a>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.iexReducer.profile,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompanyProfile));
