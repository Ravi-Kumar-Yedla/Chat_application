import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const { setMessages, selectedConversation } = useConversation();



  const sendMessage = async (message) => {
    try {
     const res = await fetch(
  `/api/message/send/${selectedConversation._id}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
    credentials: 'include',
  }
);

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // ✅ Append to previous messages array safely
      setMessages((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return [...safePrev, data];
      });

    } catch (error) {
      toast.error(error.message);
    }
  };

  return { sendMessage };
};

export default useSendMessage;

// import useConversation from '../zustand/useConversation';
// import toast from 'react-hot-toast';

// const useSendMessage = () => {
//   const { setMessages, selectedConversation } = useConversation();

//   const sendMessage = async (message) => {
//     const tempMessage = {
//       _id: Date.now(), // temporary ID
//       senderId: "you",
//       receiverId: selectedConversation._id,
//       message,
//       createdAt: new Date().toISOString(),
//     };

//     // Show temp message immediately
//     setMessages((prev) => {
//       const safePrev = Array.isArray(prev) ? prev : [];
//       return [...safePrev, tempMessage];
//     });

//     try {
//       const res = await fetch(
//         `/api/message/send/${selectedConversation._id}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ message }),
//           credentials: 'include',
//         }
//       );

//       const data = await res.json();
//       if (data.error) throw new Error(data.error);

//       // 🔁 Replace temp with real message
//       setMessages((prev) => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         const updated = safePrev.slice(0, -1);
//         return [...updated, data.newMessage];
//       });

//     } catch (error) {
//       toast.error(error.message);
//       // Optional: Remove tempMessage on failure
//     }
//   };

//   return { sendMessage };
// };

// export default useSendMessage;
