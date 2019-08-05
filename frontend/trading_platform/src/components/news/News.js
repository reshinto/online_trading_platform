import React from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  summary: {
    overflowX: "hidden",
    height: 50
  }
};

class News extends React.Component {
  render() {
    const { news, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <b>NEWS</b>
        </CardContent>
        {news.map((data, i) => (
          <div key={i}>
            <Divider />
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                <b>{data.headline}</b>
              </Typography>
              <Typography
                className={classes.summary}
                component="p"
                gutterBottom
              >
                {data.summary}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                By {data.source} | {JSON.stringify(new Date(data.datetime))}
              </Typography>
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                View source
              </a>
            </CardContent>
          </div>
        ))}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.iexReducer.news
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(News));
