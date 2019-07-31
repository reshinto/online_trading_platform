import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  getData,
  getCloudData,
  getSymbols
} from "../../redux/actions/iexAction";
import classNames from "classnames";
import AsyncSelect from "react-select/async";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  innerRoot: {
    flexGrow: 1
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    paddingLeft: 75,
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 75,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

const components = {
  Control,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer
};

class SearchBar extends React.Component {
  state = {
    searchSym: "",
    multi: null
  };

  componentDidMount() {
    this.props.getSymbols();
  }

  cleanInput = () => this.setState({ searchSym: "" });

  onChange = prop => e => {
    if (typeof this.state.searchSym === "string")
      this.setState({ [prop]: e.target.value.toUpperCase() });
    if (typeof this.state.searchSym === "number")
      this.setState({ [prop]: e.target.value });
  };

  onSubmit = () => {};

  handleSearchChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  filterSymbols = searchSym => {
    let symbols = this.props.symbols.map(data => ({
      label: data.symbol,
      value: data.symbol
    }));
    return symbols.filter(i =>
      i.label.toUpperCase().includes(searchSym.toUpperCase())
    );
  };

  promiseOptions = searchSym => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterSymbols(searchSym));
      }, 1000);
    });
  };

  handleInputChange = newValue => {
    const searchSym = newValue.replace(/\W/g, "");
    this.setState({ searchSym });
    return searchSym;
  };

  render() {
    const { searchSym } = this.state;
    let { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <div className={classes.innerRoot}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <NoSsr>
            <AsyncSelect
              classes={classes}
              styles={selectStyles}
              textFieldProps={{
                InputLabelProps: {
                  shrink: true
                }
              }}
              loadOptions={this.promiseOptions}
              components={components}
              value={this.state.multi}
              onChange={this.handleSearchChange("multi")}
              placeholder="Search..."
              isMulti
            />
          </NoSsr>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    symbols: state.iexReducer.symbols
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSymbols: () => dispatch(getSymbols()),
    getCloudData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchBar));

// SearchBar without auto suggest
// <div className={classes.search}>
//   <div className={classes.searchIcon}>
//     <SearchIcon />
//   </div>
//   <InputBase
//     value={searchSym}
//     onChange={this.onChange("searchSym")}
//     onClick={this.cleanInput}
//     onSubmit={this.onSubmit}
//     placeholder="Search…"
//     autoComplete={this.props.symbols}
//     classes={{
//       root: classes.inputRoot,
//       input: classes.inputInput
//     }}
//   />
// </div>

// SearchBar with auto suggest
// <div className={classes.innerRoot}>
//   <div className={classes.search}>
//     <div className={classes.searchIcon}>
//       <SearchIcon />
//     </div>
//     <NoSsr>
//       <Select
//         classes={classes}
//         styles={selectStyles}
//         textFieldProps={{
//           InputLabelProps: {
//             shrink: true
//           }
//         }}
//         options={[
//           { value: "chocolate", label: "Chocolate" },
//           { value: "strawberry", label: "Strawberry" },
//           { value: "vanilla", label: "Vanilla" }
//         ]}
//         components={components}
//         value={this.state.multi}
//         onChange={this.handleSearchChange("multi")}
//         placeholder="Search..."
//         isMulti
//       />
//     </NoSsr>
//   </div>
// </div>
