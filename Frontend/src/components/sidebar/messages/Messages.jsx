
import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/messageSkeletons";
import Message from "./Message";
import useListenMessages from "../../../hooks/useListenMessages";
import { useAuthContext } from "../../../context/authContext";
import useConversation from "../../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { authUser } = useAuthContext();
  useListenMessages();

  const { selectedConversation } = useConversation();

  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const prevMessageCount = useRef(0);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      const latestMsg = messages[messages.length - 1];
      const isSentByMe = latestMsg?.senderId === authUser._id;

      scrollToBottom("auto");

    
      if (messages.length > prevMessageCount.current && !isSentByMe) {
        scrollToBottom("smooth");
      }

      prevMessageCount.current = messages.length;
    }
  }, [messages, loading, selectedConversation?._id]);

  const scrollToBottom = (behavior) => {
    lastMessageRef.current?.scrollIntoView({ behavior });
  };

  return (
    <div className="px-4 flex-1 overflow-auto" ref={containerRef}>
      {/* {!loading &&
        messages.map((message, idx) => (
          <div
            key={message._id || `message-${idx}`}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))} */}
        {!loading && Array.isArray(messages) &&
  messages.map((message, idx) => (
    <div
      key={message._id || `message-${idx}`}
      ref={idx === messages.length - 1 ? lastMessageRef : null}
    >
      <Message message={message} />
    </div>
  ))}


      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

