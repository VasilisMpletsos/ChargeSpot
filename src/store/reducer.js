import * as actionsType from "./actions";

const initialState = {
  auth: false,
  userName: "",
  prefersDark: false,
  accountBalance: 0,
  lastCharges: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTHENTICATE:
      return {
        ...state,
        auth: true,
      };
    case actionsType.DEAUTHENTICATE:
      return {
        ...state,
        auth: false,
      };
    case actionsType.setUserName:
      return {
        ...state,
        userName: action.name,
      };
    case actionsType.darkMode:
      return {
        ...state,
        prefersDark: !state.prefersDark,
      };
    case actionsType.darkModeFalse:
      return {
        ...state,
        prefersDark: false,
      };
    case actionsType.setAccountBalance:
      return {
        ...state,
        accountBalance: action.account,
      };
    case actionsType.setLastCharges:
      return {
        ...state,
        lastCharges: action.lastCharges,
      };
    default:
      return state;
  }
};

export default reducer;
