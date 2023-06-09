import React from 'react'
import './chat.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import RightBar from '../../components/rightBar/RightBar'
import ChatContainer from '../../components/chatContainer/ChatContainer'

const Chat = () => {
  return (
    <div className='chat'>
        <Sidebar />
        <ChatContainer />
        <RightBar />
    </div>
  )
}

export default Chat