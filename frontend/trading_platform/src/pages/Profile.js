import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/userAction";

class Profile extends React.Component {
  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    // const { cparameter } = this.state;
    // const { multi } = this.props;
    // if (multi !== null) {
    //   if (multi !== prevProps.multi) {
    //     this.getCloudData(multi, cparameter);
    //   }
    //   if (cparameter !== prevState.cparameter) {
    //     this.setState({
    //       cparameter: cparameter
    //     });
    //     this.getCloudData(multi, cparameter);
    //   }
    // }
  }

  getUserData = () => {
    this.props.getUserData();
  };

  render() {
    return (
      <div>
        Welcome {this.props.userData.username}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
  };
};

const mapDispatchToProps = {
  getUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
