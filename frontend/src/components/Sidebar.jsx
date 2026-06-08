import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
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

} from "../redux/conversation/conversationSlice";


import {
  getMessagesRequestStart,
  getMessagesRequestSuccess,
  getMessagesRequestFail
} from "../redux/message/messageSlice";


import {
  createConversationAPI, getConversationsAPI, renameConversationAPI,
  deleteConversationAPI
} from "../services/conversationFunction";

import { getMessagesAPI }
  from "../services/messageFunction";

function Sidebar() {

  const dispatch = useDispatch();

  const { conversations, createConversationRequest } = useSelector((state) => state.conversation);

  const [openMenuId, setOpenMenuId] = useState(null);

  const { selectedConversation } = useSelector((state) => state.conversation);






  // FETCH PAGE DATA
  useEffect(() => {
    fetchConversations();
  }, [dispatch]);


  const fetchConversations = async () => {

    dispatch(getConversationsRequestStart());

    try {

      const res = await getConversationsAPI();

      if (!res || res.error) {

        dispatch(getConversationsRequestFail(res.message));
        alert("Failed to fetch conversations: " + res.message);

        return;
      }

      if(res.status == 429 && res.message === "Too many requests") {
        alert("Rate limit exceeded. Please try again later.");
        return;
    }



      dispatch(getConversationsRequestSuccess(res));
      alert("Conversations fetched successfully!");

    } catch (error) {

      dispatch(
        getConversationsRequestFail(error.message));
      alert("Failed to fetch conversations: " + error.message);
    }

  };


  const handleCreateConversation = async () => {

    dispatch(createConversationRequestStart());

    try {

      const res = await createConversationAPI();

      if (!res || res.error) {
        dispatch(createConversationRequestFail(res.message));
        alert("Failed to create conversation: " + res.message);
        return;
      }


      dispatch(createConversationRequestSuccess(res));
      alert("Conversation created successfully!");

    } catch (error) {

      dispatch(
        createConversationRequestFail(
          error.message
        )
      );

    }

  };


  // rename and delete handlers 
  const handleRenameConversation = async (
    conversationId
  ) => {

    const title = prompt("Enter new title");

    if (!title) return;

    dispatch(
      renameConversationRequestStart()
    );

    try {

      const res =
        await renameConversationAPI(
          conversationId,
          title
        );

      if (!res || res.error) {

        dispatch(
          renameConversationRequestFail(
            res.message
          )
        );

        return;

      }

      dispatch(
        renameConversationRequestSuccess(res)
      );

      setOpenMenuId(null);

    } catch (error) {

      dispatch(
        renameConversationRequestFail(
          error.message
        )
      );

    }

  };



  const handleDeleteConversation = async (
    conversationId
  ) => {

    dispatch(deleteConversationRequestStart());

    try {

      const res =
        await deleteConversationAPI(conversationId);

      if (!res || res.error) {

        dispatch(deleteConversationRequestFail(res.message));
        return;

      }

      dispatch(deleteConversationRequestSuccess({
        ...res,
        conversationId
      })
      );

      setOpenMenuId(null);

    } catch (error) {

      dispatch(
        deleteConversationRequestFail(
          error.message
        )
      );

    }

  };




  const handleSelectConversation = async (conversation) => {

    dispatch(setSelectedConversation(conversation));

    dispatch(getMessagesRequestStart());

    try {

      const res = await getMessagesAPI(conversation._id);

      if (!res || res.error) {

        dispatch(getMessagesRequestFail(res.message));

        return;

      }

      dispatch(getMessagesRequestSuccess(res));

    } catch (error) {

      dispatch(getMessagesRequestFail(error.message));

    }

  };

  return (

    <div className="w-300px bg-zinc-900 border-r border-zinc-800 flex flex-col">

      <div className="p-4 border-b border-zinc-800">

        <button
          onClick={handleCreateConversation}
          className="w-full bg-white text-black p-3 rounded-lg font-semibold cursor-pointer"
        >

          {
            createConversationRequest.loading
              ? "Creating..."
              : "+ New Chat"
          }

        </button>

      </div>


      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        {
          conversations.map((conversation) => (

            <div
              key={conversation._id}
              onClick={() =>
                handleSelectConversation(
                  conversation
                )
              }
              className={`group relative p-3 rounded-lg text-white cursor-pointer flex items-center justify-between
      
      ${selectedConversation?._id ===
                  conversation._id

                  ? "bg-zinc-700"

                  : "bg-zinc-800 hover:bg-zinc-700"
                }
      `}
            >

              <p className="truncate">
                {conversation.title}
              </p>


              <div className="relative">

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    setOpenMenuId(

                      openMenuId ===
                        conversation._id

                        ? null

                        : conversation._id
                    );

                  }}
                  className="hidden group-hover:block px-2"
                >

                  ⋮

                </button>


                {
                  openMenuId ===
                  conversation._id && (

                    <div className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-50">

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          handleRenameConversation(
                            conversation._id
                          );

                        }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                      >

                        Rename

                      </button>


                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          handleDeleteConversation(
                            conversation._id
                          );

                        }}
                        className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-500"
                      >

                        Delete

                      </button>

                    </div>

                  )
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Sidebar;