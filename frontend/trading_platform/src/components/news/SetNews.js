import React from "react";
import { connect } from "react-redux";
import { getNews } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import News from "./News";

class SetNews extends React.Component {
  state = {
    cparameter: this.props.noOfNews
  };

  componentDidMount() {
    this.getNews(this.props.multi, this.state.cparameter);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cparameter } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.getNews(multi, cparameter);
      }
      if (cparameter !== prevState.cparameter) {
        this.setState((prevState, props) => ({
          cparameter: prevState.cparameter
        }));
        this.getNews(multi, cparameter);
      }
    }
  }

  getNews = (symbol, cparameter) => {
    this.props.getNews(symbol[0].value, cparameter);
  };

  handleRangeChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.news.length !== 0 ? (
          <Paper elevation={2}>
            <News height={this.props.height} />
          </Paper>
        ) : (
          <div>loading...</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.iexReducer.news,
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
