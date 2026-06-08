import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({

    name: "message",

    initialState: {

        messages: [],

        getMessagesRequest: {
            loading: false,
            success: false,
            error: null,
            message: ""
        },

        sendMessageRequest: {
            loading: false,
            success: false,
            error: null,
            message: ""
        },

        isTyping: false, 

        isStreaming:false, // to track if streaming is in progress [ for showing typing indicator [markdown rendering] ]


    },

    reducers: {

        getMessagesRequestStart: (state) => {

            state.getMessagesRequest.loading = true;
            state.getMessagesRequest.success = false;
            state.getMessagesRequest.error = null;

        },


        getMessagesRequestSuccess: (
            state,
            action
        ) => {

            state.getMessagesRequest.loading = false;
            state.getMessagesRequest.success = true;
            state.messages =
                action.payload.messages;

            console.log("inside getMessagesRequestSuccess", state.messages);


        },


        getMessagesRequestFail: (
            state,
            action
        ) => {

            state.getMessagesRequest.loading = false;
            state.getMessagesRequest.error =
                action.payload;

        },


        // TEMP MESSAGE
        addTemporaryMessage: (state, action) => {

            state.messages.push(
                action.payload
            );

        },

        // SEND MESSAGE
        sendMessageRequestStart: (state) => {

            state.sendMessageRequest.loading = true;

            state.sendMessageRequest.success = false;

            state.sendMessageRequest.error = null;

            state.isTyping = true;

        },


        // sendMessageRequestSuccess: (
        //     state,
        //     action
        // ) => {

        //     state.sendMessageRequest.loading = false;

        //     state.isTyping=false;

        //     state.sendMessageRequest.success = true;

        //     console.log("inside send message slice = ", action.payload);
        //     state.messages.push(
        //         action.payload.userMessage
        //     );

        //     state.messages.push(
        //         action.payload.aiMessage
        //     );

        // },


        sendMessageRequestFail: (
            state,
            action
        ) => {

            state.sendMessageRequest.loading = false;
            state.isTyping = false;

            state.sendMessageRequest.error =
                action.payload;

            state.isTyping = false;
        },

        // STREAMING

        startStreamingMessage: (state) => {

            state.messages.push({

                _id: Date.now(),

                role: "assistant",

                content: ""

            });

            state.isStreaming = true;

        },

        updateStreamingMessage: (state,action) => {

            const lastMessage =

                state.messages[
                    state.messages.length - 1
                ];

            if (lastMessage && lastMessage.role === "assistant"){

                lastMessage.content += action.payload;

                console.log("inside update streaming",action.payload);

            }

        },


        finishStreamingMessage: (state) => {

            state.sendMessageRequest.loading = false;

            state.sendMessageRequest.success = true;

            state.isTyping = false;

            state.isStreaming = false;

        },

    }

});

export const {

    getMessagesRequestStart,
    getMessagesRequestSuccess,
    getMessagesRequestFail,

    addTemporaryMessage,

    sendMessageRequestStart,
    sendMessageRequestFail,
    
    startStreamingMessage,
    updateStreamingMessage,
    finishStreamingMessage,
    
} = messageSlice.actions;

export default messageSlice.reducer;