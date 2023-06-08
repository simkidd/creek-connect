import React from 'react'
import Message from '../message/Message'
import './chatMessages.scss'

const ChatMessages = () => {
  return (
    <div className='chat__messages'>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default ChatMessages