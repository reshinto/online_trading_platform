// import React from "react";
// import { connect } from "react-redux";
// import { getTrades, deleteTrade } from "../redux/actions/tradeAction";
// import Trade from "../components/portfolio/Trade";
// import Dialog from "@material-ui/core/Dialog";
// import Button from "@material-ui/core/Button";
// import PortfolioHistory from "../components/portfolio/PortfolioHistory";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

// class Portfolio extends React.Component {
//   state = {
//     openTrade: false
//   };

//   componentDidMount() {
//     this.props.getTrades();
//   }

//   handleClickOpenTrade = () => {
//     this.setState({ openTrade: true });
//   };

//   closeDialog = () => {
//     this.setState({
//       openTrade: false
//     });
//   };

//   render() {
//     const { funds } = this.props;
//     return (
//       <div style={{ height: "93vh", overflowY: "auto" }}>
//         <Grid
//           container
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             flexWrap: "wrap",
//             alignContent: "flex-start"
//           }}
//         >
//           <Grid item>
//             <Paper>
//               <h1>My Portfolio</h1>
//               <h5>Cash: {funds[funds.length - 1].totalFund}</h5>
//               <Button
//                 color="inherit"
//                 onClick={this.handleClickOpenTrade}
//                 // component={Link} to="/login"
//               >
//                 Trade
//               </Button>
//               <Dialog
//                 open={this.state.openTrade}
//                 onClose={this.closeDialog}
//                 aria-labelledby="form-dialog-title"
//               >
//                 <Trade clickSubmit={this.closeDialog} />
//               </Dialog>
//             </Paper>
//           </Grid>
//           <Grid item>
//             <Paper>
//               <PortfolioHistory />
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     funds: state.fundsReducer.funds
//   };
// };

// const mapDispatchToProps = {
//   getTrades,
//   deleteTrade
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Portfolio);
