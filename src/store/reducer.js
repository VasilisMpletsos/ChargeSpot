import * as actionsType from "./actions";

const initialState = {
  auth: false,
  userName: "default",
  prefersDark: true,
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
  }
  return state;
};

export default reducer;
