import React from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    padding: 20
  },
  card: {
    display: "flex",
    padding: 20,
    overflowY: "auto"
  },
  media: {
    // objectFit: "cover",
    width: 200,
    height: 200
  },
  content: {
    flex: "1 0 auto"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: 24
  },
  pos: {
    marginTop: 10
    // marginBottom: 10
  }
};

class News extends React.Component {
  render() {
    let { news, options, classes } = this.props;
    news = news.articles;

    return (
      <div className={classes.root} style={{ height: this.props.height }}>
        <Typography className={classes.title} gutterBottom>
          <b>NEWS</b>
        </Typography>
        {news.map((data, i) => (
          <Card key={i} className={classes.card}>
            <Divider />
            <CardMedia
              component="img"
              alt="No Image"
              className={classes.media}
              height="140"
              image={data.urlToImage}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography className={classes.pos} gutterBottom>
                  <b>{data.title}</b>
                </Typography>
                <Typography component="p" gutterBottom>
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
            </div>
          </Card>
        ))}
      </div>
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
