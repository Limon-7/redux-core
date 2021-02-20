import { createSelector } from "reselect";
const initialState = {
  // count: 1,
  currentTab: "tab1",
};
const TAB_SELECTED = "TAB_SELECTED";
export const setCurrentTab = (payload) => ({
  type: TAB_SELECTED,
  payload: payload,
});
const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SELECTED: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }
    default:
      return state;
  }
};
export const selectToggle = (state) => state.toggle;
export default toggleReducer;
