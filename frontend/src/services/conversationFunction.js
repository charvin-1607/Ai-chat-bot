import { CONVERSATION_ROUTE } from "../config/api";


export const createConversationAPI = async () => {

  try {

    const response = await fetch(
      `${CONVERSATION_ROUTE}/`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    const data = await response.json();
    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};


export const getConversationsAPI = async () => {

  try {

    const response = await fetch(
      `${CONVERSATION_ROUTE}/`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    const data = await response.json();

    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};


export const renameConversationAPI = async (conversationId,title) => {

  try {

    const response = await fetch(
      `${CONVERSATION_ROUTE}/${conversationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify({ title })
      }
    );

    const data = await response.json();

    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};



export const deleteConversationAPI = async (
  conversationId
) => {

  try {

    const response = await fetch(
      `${CONVERSATION_ROUTE}/${conversationId}`,
      {
        method: "DELETE",

        credentials: "include"
      }
    );

    const data = await response.json();

    return data;

  } catch (error) {

    return {
      error: true,
      message: error.message
    };

  }

};