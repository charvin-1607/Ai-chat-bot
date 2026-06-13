import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({

  name: "conversation",

  initialState: {

    conversations: [],

    selectedConversation: null,

    createConversationRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    },

    getConversationsRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    },

    renameConversationRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    },

    deleteConversationRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    }

  },

  reducers: {

    // CREATE CONVERSATION
    createConversationRequestStart: (state) => {

      state.createConversationRequest.loading = true;
      state.createConversationRequest.success = false;
      state.createConversationRequest.error = null;
      state.createConversationRequest.message = "";

    },


    createConversationRequestSuccess: (state, action) => {

      state.createConversationRequest.loading = false;
      state.createConversationRequest.success = true;
      state.createConversationRequest.message = action.payload.message;
      state.conversations.unshift(
        action.payload.conversation
      );

      state.selectedConversation = action.payload.conversation;

    },


    createConversationRequestFail: (state, action) => {
      state.createConversationRequest.loading = false;
      state.createConversationRequest.error = action.payload;

    },


    // GET CONVERSATIONS
    getConversationsRequestStart: (state) => {

      state.getConversationsRequest.loading = true;
      state.getConversationsRequest.success = false;
      state.getConversationsRequest.error = null;
      state.getConversationsRequest.message = "";

    },


    getConversationsRequestSuccess: (state, action) => {

      state.getConversationsRequest.loading = false;
      state.getConversationsRequest.success = true;
      state.conversations = action.payload.conversations;

     // console.log("Conversations fetched successfully:", state.conversations);

    },


    getConversationsRequestFail: (state, action) => {

      state.getConversationsRequest.loading = false;
      state.getConversationsRequest.error = action.payload;
    },


    // RENAME CONVERSATION
    renameConversationRequestStart: (state) => {

      state.renameConversationRequest.loading = true;

      state.renameConversationRequest.success = false;

      state.renameConversationRequest.error = null;

    },


    renameConversationRequestSuccess: (
      state,
      action
    ) => {

      state.renameConversationRequest.loading = false;

      state.renameConversationRequest.success = true;

      state.renameConversationRequest.message =
        action.payload.message;

      state.conversations =
        state.conversations.map((conversation) =>

          conversation._id ===
            action.payload.conversation._id

            ? action.payload.conversation
            : conversation
        );

    },


    renameConversationRequestFail: (
      state,
      action
    ) => {

      state.renameConversationRequest.loading = false;

      state.renameConversationRequest.error =
        action.payload;

    },



    // DELETE CONVERSATION
    deleteConversationRequestStart: (state) => {

      state.deleteConversationRequest.loading = true;

      state.deleteConversationRequest.success = false;

      state.deleteConversationRequest.error = null;

    },


    deleteConversationRequestSuccess: (
      state,
      action
    ) => {

      state.deleteConversationRequest.loading = false;

      state.deleteConversationRequest.success = true;

      state.deleteConversationRequest.message =
        action.payload.message;

      state.conversations =
        state.conversations.filter(
          (conversation) =>
            conversation._id !==
            action.payload.conversationId
        );

    },


    deleteConversationRequestFail: (
      state,
      action
    ) => {

      state.deleteConversationRequest.loading = false;

      state.deleteConversationRequest.error =
        action.payload;

    },


    setSelectedConversation: (state, action) => {

      state.selectedConversation =
        action.payload;

        // console.log("iniside conversation slice Selected Conversation:", state.selectedConversation);

    },

  }

});


export const {

  createConversationRequestStart,
  createConversationRequestSuccess,
  createConversationRequestFail,

  getConversationsRequestStart,
  getConversationsRequestSuccess,
  getConversationsRequestFail,

  renameConversationRequestStart,
  renameConversationRequestSuccess,
  renameConversationRequestFail,

  deleteConversationRequestStart,
  deleteConversationRequestSuccess,
  deleteConversationRequestFail,

  setSelectedConversation


} = conversationSlice.actions;


export default conversationSlice.reducer;