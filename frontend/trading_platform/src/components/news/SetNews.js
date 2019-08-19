import React from "react";
import { connect } from "react-redux";
import { getNews } from "../../redux/actions/newsAction";
import Paper from "@material-ui/core/Paper";
import News from "./News";
import Loading from "../Loading";

class SetNews extends React.Component {
  state = {
    options: {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false
    }
  };

  componentDidMount() {
    this.getNews(this.props.multi, this.state.cparameter);
  }

  componentDidUpdate(prevProps, prevState) {
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getNews(multi);
      }
    }
  }

  getNews = (symbol) => {
    if (symbol[0] !== undefined)
      this.props.getNews(symbol[0].value);
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { news, height } = this.props
    return (
      <React.Fragment>
        {news.articles !== undefined ? (
          <Paper elevation={0}>
              <News height={height} {...this.state}/>
          </Paper>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.newsReducer.news,
    multi: state.searchReducer.multi
  };
};

const mapDispatchToProps = {
  getNews
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetNews);
