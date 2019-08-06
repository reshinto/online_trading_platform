import React from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 300,
    overflowY: "auto"
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginTop: 6,
    marginBottom: 6
  },
};

class News extends React.Component {
  render() {
    const { news, classes } = this.props;

    return (
      <Card className={classes.card} style={{height: this.props.height}}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            <b>NEWS</b>
          </Typography>
          {news.map((data, i) => (
            <div key={i}>
              <Divider />
              <Typography className={classes.pos} gutterBottom>
                <b>{data.headline}</b>
              </Typography>
              <Typography
                component="p"
                gutterBottom
              >
                {data.summary}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                By {data.source} | {JSON.stringify(new Date(data.datetime))}
              </Typography>
              <Typography className={classes.pos}>
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  View source
                </a>
              </Typography>
            </div>
          ))}
        </CardContent>
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
