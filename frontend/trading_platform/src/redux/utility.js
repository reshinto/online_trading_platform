export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Get token from state
  const token = getState().authReducer.token;
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const currencyFormat = (num, i) => {
  return num.toFixed(i).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatStr = str => {
  // let splitStrAtCaps = str.split(/(?=[A-Z])/).join(" ");
  // const strArr = splitStrAtCaps.split("");
  const strArr = str.split("");
  let newStr = "";
  for (let i = 0; i < strArr.length; i++) {
    // add space around number
    if (!isNaN(parseInt(strArr[i], 10))) {
      if (strArr[i - 1] !== undefined && isNaN(parseInt(strArr[i - 1], 10))) {
        newStr = newStr + " " + strArr[i];
      } else {
        newStr = newStr + strArr[i];
      }
      if (
        strArr[i + 1] !== undefined &&
        strArr[i + 1] !== " " &&
        isNaN(parseInt(strArr[i + 1], 10))
      ) {
        newStr = newStr + " ";
      }
    } else {
      // add space if letter is uppercase
      if (strArr[i - 1] === undefined) {
        newStr = strArr[i].toUpperCase();
      } else if (
        strArr[i - 1] !== undefined &&
        strArr[i - 1] === strArr[i - 1].toLowerCase() &&
        strArr[i] === strArr[i].toUpperCase()
      ) {
        newStr = newStr + " " + strArr[i];
      } else {
        if (
          strArr[i - 1] !== undefined &&
          strArr[i - 2] !== undefined &&
          strArr[i - 2] === "P" &&
          strArr[i - 1] === "E" &&
          strArr[i] === "R"
        ) {
          newStr = newStr + " " + strArr[i];
        } else {
          newStr = newStr + strArr[i];
        }
      }
    }
  }
  return newStr.toUpperCase();
};

export const db = process.env.REACT_APP_DB;
