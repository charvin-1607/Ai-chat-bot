import { useSelector } from "react-redux";

import { useEffect, useRef } from "react";


import MessageInput from "../components/MessageInput";


import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter }
  from "react-syntax-highlighter";

import { oneDark }
  from "react-syntax-highlighter/dist/esm/styles/prism";

import { FaRegCopy } from "react-icons/fa";




function ChatArea() {

  const { messages, isTyping, isStreaming} = useSelector(
    (state) => state.message
  );

  console.log(
    "CHAT RENDER",
    messages
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, isTyping]);



  // for copy part
  const copyCode = (code) => {

    navigator.clipboard.writeText(code);

  };


  const copyMessage = (content) => {

    navigator.clipboard.writeText(content);

  };



  return (

    <div className="flex-1 flex flex-col bg-black">

      <div className="p-4 border-b border-zinc-800 text-white font-semibold">

        {
          selectedConversation
            ? selectedConversation.title
            : "Select Conversation"
        }

      </div>


      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {
          messages
            .filter((message) => message)
            .map((message, index) => (

              <div
                key={message._id || index}
                className={`flex

${message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                  }
`}
              >

                <div
                  className={`p-4 rounded-xl max-w-500px whitespace-pre-wrap

${message.role === "user"
                      ? "bg-white text-black"

                      : "bg-zinc-800 text-white"
                    }
`}
                >

                  {/* {message.content} */}


                  {isStreaming ?

                    <div>
                      {message.content}
                    </div>

                    :

                    <ReactMarkdown

                    components={{

                      code({
                        inline,
                        className,
                        children,
                        ...props
                      }) {

                        const match = /language-(\w+)/.exec(
                          className || ""
                        );

                        return match ? (
                          <div className="rounded-lg overflow-hidden border border-zinc-700">

                            <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-sm">

                              <span className="text-zinc-400">
                                {match[1]}
                              </span>

                              <button
                                onClick={() =>
                                  copyCode(
                                    String(children).replace(/\n$/, "")
                                  )
                                }
                                className="flex items-center gap-2 text-zinc-400 hover:text-white cursor-pointer"
                              >

                                <FaRegCopy />

                                Copy

                              </button>

                            </div>

                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                borderRadius: 0
                              }}
                            >

                              {String(children).replace(/\n$/, "")}

                            </SyntaxHighlighter>

                          </div>

                        ) : (

                          <code
                            className={className}
                            {...props}
                          >

                            {children}

                          </code>

                        );

                      }

                    }}

                  >

                    {message.content}

                  </ReactMarkdown>

                  }


                  {/* copy whole message  */}

                  {
                    message.role === "assistant" && (

                      <button
                        onClick={() =>
                          copyMessage(
                            message.content
                          )
                        }
                        className="mt-2 text-zinc-400 hover:text-white text-sm cursor-pointer text-left"
                      >

                        <br />

                        {/* // add style and text for copy button */}

                        <FaRegCopy className="inline-block mr-1 text-zinc-100" />


                      </button>

                    )
                  }

                </div>

              </div>

            ))
        }


        {/* is typing indicator */}
        {
          isTyping && (

            <div className="flex justify-start">

              <div className="bg-zinc-800 text-white px-5 py-4 rounded-xl flex gap-2">

                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>

                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>

                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>

              </div>

            </div>

          )
        }

        <div ref={bottomRef}></div>

      </div>


      <MessageInput />

    </div>

  );

}

export default ChatArea;