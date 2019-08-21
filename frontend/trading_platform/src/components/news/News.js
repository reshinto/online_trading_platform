import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
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
    marginTop: 10
  }
};

class News extends React.Component {
  render() {
    let { news, options, classes } = this.props;
    news = news.articles;

    return (
      <Grid container className={classes.root} style={{ height: this.props.height }}>
        <Typography className={classes.title} gutterBottom>
          <b>NEWS</b>
        </Typography>
        {news.map((data, i) => (
          <Card key={i} className={classes.card}>
            <Grid item md={2}>
              <CardMedia
                component="img"
                alt="No Image"
                image={data.urlToImage}
              />
            </Grid>
            <Grid item className={classes.details} xs={9}>
              <CardContent className={classes.content}>
                <Typography className={classes.pos} gutterBottom>
                  <b>{data.title}</b>
                </Typography>
                <Typography
                  className={classes.description}
                  component="p"
                  gutterBottom
                >
                  {data.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  By: {data.author}
                </Typography>
                <Typography color="textSecondary">
                  Source: {data.source.name}
                </Typography>
                <Typography color="textSecondary">
                  Date:{" "}
                  {new Date(data.publishedAt).toLocaleString("en-US", options)}
                </Typography>
                <Typography className={classes.pos}>
                  <a href={data.url} target="_blank" rel="noopener noreferrer">
                    View source
                  </a>
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.newsReducer.news
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(News));
