import { useState, useRef } from "react";

import { useDispatch, useSelector }
    from "react-redux";

import {

    addTemporaryMessage,

    sendMessageRequestStart,
    sendMessageRequestFail,

    startStreamingMessage,
    updateStreamingMessage,
    finishStreamingMessage

} from "../redux/message/messageSlice";

import {
    sendMessageAPI
} from "../services/messageFunction";

function MessageInput() {

    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const controllerRef = useRef(null);

    const { selectedConversation } = useSelector((state) => state.conversation);

    const { sendMessageRequest } = useSelector((state) => state.message);




    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!content.trim()) return
        if (!selectedConversation) return;

        const tempMessage = {
            _id: Date.now(),
            role: "user",
            content
        };

        dispatch(addTemporaryMessage(tempMessage));

        controllerRef.current = new AbortController();
        // console.log("Controller Created: ", controllerRef.current);

        dispatch(sendMessageRequestStart());

        dispatch(startStreamingMessage());

        const currentMessage = content;

        setContent("");

        try {
            
            const res = await sendMessageAPI(
                
                selectedConversation._id,
                currentMessage,
                
                (chunk) => {
                    
                    // console.log(
                    //     "CHUNK RECEIVED = ",
                    //     chunk
                    //     );
                        
                        dispatch(updateStreamingMessage(chunk));
                        
                    },
                    
                    controllerRef.current.signal
                    
                );
                
                // console.log("controller after response: ", controllerRef.current.signal);
            
            if (!res || res.error) {

                dispatch(sendMessageRequestFail(res.message));

                return;

            }

           
            dispatch(finishStreamingMessage());

        } catch (error) {

            if (error.name === "AbortError") {

                dispatch(finishStreamingMessage());
                return;
            }
        
            dispatch(sendMessageRequestFail(error.message));

        }

    };

    const handleStopGeneration = () => {

        if (controllerRef.current) {
            controllerRef.current.abort();
            
            // console log to verify that the abort signal is sent

            // console.log("Abort signal sent inside  handleStopGeneration : ", controllerRef.current);
        }

    };


    return (

        <div className="p-4 border-t border-zinc-800">

            <form
                onSubmit={handleSubmit}
                className="flex gap-3"
            >

                <textarea

                    placeholder="Ask anything..."

                    value={content}

                    onChange={(e) =>
                        setContent(
                            e.target.value
                        )
                    }

                    className="flex-1 bg-zinc-800 text-white p-4 rounded-lg outline-none"
                />

                {
                    sendMessageRequest.loading
                        ?

                        <button

                            type="button"
                            onClick={handleStopGeneration}
                            className="bg-red-500 text-white px-6 rounded-lg font-semibold cursor-pointer"
                        >

                            Stop

                        </button>

                        :

                        <button

                            type="submit"
                            className="bg-white text-black px-6 rounded-lg font-semibold cursor-pointer"
                        >

                            Send

                        </button>

                }

            </form>

        </div>

    );

}

export default MessageInput;