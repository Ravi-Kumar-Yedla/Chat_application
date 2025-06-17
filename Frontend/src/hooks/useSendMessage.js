// import useConversation from '../zustand/useConversation';
// import toast from 'react-hot-toast';

// const useSendMessage = () => {
//   const { setMessages, selectedConversation } = useConversation();



//   const sendMessage = async (message) => {
//     try {
//      const res = await fetch(
//   `/api/message/send/${selectedConversation._id}`,
//   {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message }),
//     credentials: 'include',
//   }
// );

//       const data = await res.json();
//       if (data.error) throw new Error(data.error);

//       // ✅ Append to previous messages array safely
//       setMessages((prev) => {
//         const safePrev = Array.isArray(prev) ? prev : [];
//         return [...safePrev, data];
//       });

//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return { sendMessage };
// };

// export default useSendMessage;

import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const { setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    const tempMessage = {
      _id: Date.now(), // temporary ID
      senderId: "you", // optional
      receiverId: selectedConversation._id,
      message,
      createdAt: new Date().toISOString(),
      // ...any other fields you normally receive
    };

    // ✅ Show message immediately
    setMessages((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return [...safePrev, tempMessage];
    });

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

      // Optional: Replace tempMessage with real message from server using _id
      // You can do this by updating setMessages again
    } catch (error) {
      toast.error(error.message);
      // Optional: remove the tempMessage from the UI if failed
    }
  };

  return { sendMessage };
};

export default useSendMessage;
