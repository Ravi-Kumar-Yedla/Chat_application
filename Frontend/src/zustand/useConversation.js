// import {create} from 'zustand'

// const useConversation  = create((set) =>({
//     selectedConversation :null ,
//     setSelectedConversation : (selectedConversation) =>set({selectedConversation}),
//      messages : [],
//      setMessages : (messages) => set({messages})


// }))

// export default useConversation



// import { create } from 'zustand';

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
//   messages: [], // ✅ always initialize as array
//   setMessages: (messages) => {
//     // ✅ safeguard so messages is always an array
//     set({ messages: Array.isArray(messages) ? messages : [] });
//   },
// }));

// export default useConversation;

// zustand/useConversation.js
import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useConversation;
