import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions/fmpAction";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    padding: 20,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 10
  },
  description: {
    textAlign: "justify"
  },
  content: {
    flex: "1 0 auto"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: 20
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginBottom: 10
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
    if (symbol[0] !== undefined) this.props.getProfile(symbol[0].value);
  };

  render() {
    let { profile, classes } = this.props;
    profile = profile.profile;

    return (
      <Grid
        container
        className={classes.root}
        style={{ height: this.props.height }}
      >
        <Typography className={classes.title} gutterBottom>
          <b>COMPANY PROFILE</b>
        </Typography>
        {profile !== undefined ? (
          <Card className={classes.card}>
            <Grid item md={2}>
              <CardMedia
                component="img"
                alt="No Image"
                image={profile.image}
              />
            </Grid>
            <Grid item className={classes.details} xs={9}>
              <CardContent className={classes.content}>
                <Typography className={classes.pos} gutterBottom>
                  <b>{profile.companyName}</b>
                </Typography>
                <Typography
                  className={classes.description}
                  component="p"
                  gutterBottom
                >
                  {profile.description}
                </Typography>
                <Typography color="textSecondary">
                  Sector: {profile.sector}
                </Typography>
                <Typography color="textSecondary">
                  Industry: {profile.industry}
                </Typography>
                <Typography color="textSecondary">
                  CEO: {profile.ceo}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Exchange: {profile.exchange}
                </Typography>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Website
                </a>
              </CardContent>
            </Grid>
          </Card>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.fmpReducer.profile,
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
