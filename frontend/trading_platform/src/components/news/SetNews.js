import React from "react";
import { connect } from "react-redux";
import { getNews } from "../../redux/actions/iexAction";
import Paper from "@material-ui/core/Paper";
import News from "./News";

class SetNews extends React.Component {
  state = {
    symbol: [{ label: "SNAP", value: "SNAP" }],
    cparameter: "3"
  };

  componentDidMount() {
    this.getNews(this.state.symbol, this.state.cparameter);
  }

  componentDidUpdate(prevProps, prevState) {
    const { symbol, cparameter } = this.state;
    const { multi } = this.props;
    if (multi !== null) {
      if (multi !== prevProps.multi) {
        this.setState({
          symbol: multi
        });
        this.getNews(multi, cparameter);
      }
      if (cparameter !== prevState.cparameter) {
        this.setState({
          cparameter: cparameter
        });
        this.getNews(symbol, cparameter);
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
            <News />
          </Paper>
        ) : (
          ""
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
