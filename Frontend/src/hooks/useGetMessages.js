// import React, { useEffect, useState } from 'react'
// import useConversation from '../zustand/useConversation'
// import toast from 'react-hot-toast'

// // const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


// const useGetMessages = () => {
//   const[loading,setLoading] = useState(false)
//   const{messages,setMessages,selectedConversation} = useConversation()
// useEffect(() => {
//     const getMessages = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch(
//           `/api/message/${selectedConversation._id}`,
//           {
//             credentials: 'include', // include cookies if using auth
//           }
//         );
//             const data = await res.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }
//             setMessages(data);
//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Only fetch messages if the conversation ID exists
//     if (selectedConversation?._id) {
//         getMessages();
//     }
// }, [selectedConversation?._id,messages.length]); // Only fetch when the selected conversation changes

// return {loading,messages} 
// }

// export default useGetMessages




import { useEffect, useRef } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const { setMessages, selectedConversation } = useConversation();
  const fetchedConversationId = useRef(null); // 🧠 Track last fetched convo ID

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`, {
          credentials: 'include',
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setMessages(data); // ✅ Instant update
        fetchedConversationId.current = selectedConversation._id;
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (
      selectedConversation?._id &&
      fetchedConversationId.current !== selectedConversation._id // ✅ Only fetch if it's a new convo
    ) {
      getMessages();
    }
  }, [selectedConversation]);

  return {}; // ✅ No loading spinner needed
};

export default useGetMessages;

