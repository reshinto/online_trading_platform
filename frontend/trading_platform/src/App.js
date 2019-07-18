import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Platform from "./components/Platform";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Platform />
      </Provider>
    );
  }
}

export default App;
