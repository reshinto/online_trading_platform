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

export const currencyFormat = num => {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
