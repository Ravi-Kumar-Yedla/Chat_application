import React from 'react'
// import Sidebar from '../../components/sidebar/sidebar'
import Sidebar from '../../components/sidebar/Sidebar'

import MessageContainer from '../../components/sidebar/messages/MessageContainer'
const Home = () => {
  return (
    <div  className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;
