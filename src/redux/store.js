import { createSlice, configureStore } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
  name: "online",
  initialState: {
    users: [],
    detailArray: [],
    loginUserEach: null,
    allUsersList: [],
    customizeTags: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    detailObject: (state, action) => {
      state.detailArray = [action.payload];
    },
    loginUser: (state, action) => {
      const data = action.payload;
      localStorage.setItem("lastUserInfo", JSON.stringify(data));
      state.loginUserEach = data;
    },
    userList: (state, action) => {
      state.allUsersList.push(action.payload);
    },
    customizeTag: (state, action) => {
      state.customizeTags.push(action.payload);
    },
  },
});

export const { addUser, detailObject, loginUser, userList, customizeTag } =
  onlineSlice.actions;

const store = configureStore({
  reducer: onlineSlice.reducer,
});

export default store;
