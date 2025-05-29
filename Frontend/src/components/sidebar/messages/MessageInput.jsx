import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react'

import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {

    const [message, setMessage] = useState("")
    const { loading, sendMessage } = useSendMessage();
    const[showEmojiPicker,setShowEmojiPicker] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return 
        await sendMessage(message);``
        setMessage('')
    }

    const handleEmojiClick = (emoji)=>{
        // console.log(emoji)
        if(emoji.emoji){

    setMessage((prevMessage)=> prevMessage+emoji.emoji)
        }
        setShowEmojiPicker(false)
    }
    return (

        <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative flex items-center bg-gray-700 border border-gray-600 rounded-lg">
          
          {/* Emoji Button */}
          <button
            type="button"
            className="text-xl text-white p-2"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
      
          {/* Message Input */}
          <input
            type="text"
            className="flex-1 bg-transparent text-white text-sm py-2 px-3 placeholder-gray-400 "

            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
      
          {/* Send Button */}
          <button
            type="submit"
            className="text-white p-2"
          >
            {loading ? (
              <div className="loading loading-spinner text-white"></div>
            ) : (
              <BsSend className="text-white" />
            )}
          </button>
        </div>
      
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </form>
      

    );
};
export default MessageInput;
