import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

// const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


const useGetMessages = () => {
  const[loading,setLoading] = useState(false)
  const{messages,setMessages,selectedConversation} = useConversation()
useEffect(() => {
    const getMessages = async () => {
        setLoading(true);
        try {
           const res = await fetch(`/api/message/${selectedConversation._id}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Only fetch messages if the conversation ID exists
    if (selectedConversation?._id) {
        getMessages();
    }
}, [selectedConversation?._id,messages.length]); // Only fetch when the selected conversation changes

return {loading,messages} 
}

export default useGetMessages





