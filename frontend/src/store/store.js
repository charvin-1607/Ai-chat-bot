import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/auth/authSlice"
import conversationReducer from "../redux/conversation/conversationSlice";
import messageReducer from "../redux/message/messageSlice";


const store = configureStore({

  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    message: messageReducer
  }

});

export default store;