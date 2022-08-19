export const initialState = {
  login: false,
  userName: "",
  value: 0,
  toggle: false,
  search: "",
};

const reducer = (state, action) => {
  // console.log("✨✨" + JSON.stringify(action));
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: action.login,
      };
    case "TOGGLE":
      return {
        ...state,
        toggle: action.toggle,
      };
    case "USER":
      return {
        ...state,
        userName: action.userName,
      };
    case "VALUE":
      return {
        ...state,
        value: action.value,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default reducer;
