import React from 'react'
import './chat.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import RightBar from '../../components/rightBar/RightBar'

const Chat = () => {
  return (
    <div className='chat'>
        <Sidebar />
        <Outlet />
        <RightBar />
    </div>
  )
}

export default Chat