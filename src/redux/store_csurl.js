import { createStore } from "redux";

const initialState = {
  csURL: "http://52.90.39.12:3003/",
};

const csurlReducer = (state = initialState, action) => {
  return state;
};

const store_csurl = createStore(csurlReducer);

export default store_csurl;
