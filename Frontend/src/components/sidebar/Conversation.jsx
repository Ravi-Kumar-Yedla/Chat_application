
// import React from 'react';
// import useConversation from '../../zustand/useConversation';
// import { useSocketContext } from '../../context/socketContext';

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation()

//   const isSelected = selectedConversation?._id === conversation._id;
//   const { onlineUsers } = useSocketContext()
//   const isOnline = onlineUsers.includes(conversation._id)

//   //  const fallbackProfilePic = `https://api.dicebear.com/7.x/initials/svg?seed=${conversation.username || 'user'}`;
//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
// 				${isSelected ? "bg-sky-500" : ""}
// 			`}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div className='avatar relative'>
//           <div className='w-12 rounded-full'>
//             <img src={conversation.profilePic} alt='user avatar' />
//           </div>


//           {isOnline && (
//             <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
//           )}
//         </div>

//         <div className='flex flex-col flex-1'>
//           <div className='flex gap-3 justify-between'>
//             <p className='font-bold text-gray-200'>{conversation.fullName}</p>
//             <span className='text-xl'>{emoji}</span>
//           </div>
//         </div>
//       </div>

//       {!lastIdx && <div className='divider my-0 py-0 h-1' />}
//     </>
//   );
// };

// export default Conversation;

import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/socketContext';

const fallbackProfilePic = 'https://api.dicebear.com/7.x/initials/svg?seed=user';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className='avatar relative'>
          <div className='w-12 rounded-full'>
            <img
              src={conversation.profilePic}
              alt='user avatar'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackProfilePic;
              }}
            />
          </div>

          {isOnline && (
            <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></div>
          )}
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;





