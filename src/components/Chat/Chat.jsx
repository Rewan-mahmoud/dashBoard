import React from 'react';
import ChatApp from "../Chat/ChatApp.css" // Import CSS for styling
import { useTranslation } from 'react-i18next';

const Chat = () => {
  const recentChats = [
    { name: 'عبدالله بن نواف', message: "Hey! I'm available", time: '02:50 PM' },
    { name: 'Mark Messer', message: 'Images', time: '10:30 AM', unreadCount: 2 },
    { name: 'General', message: 'Text', time: '02:06 PM' },
    { name: 'Designer', message: 'Text ', time: '02:10 PM', unreadCount: 1 },
    { name: 'Steve Walker', message: 'Admin-A.zip', time: '01:16 PM' },
  ];
  const { t } = useTranslation();
  return (
    <div className="chat-app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Search messages or users" />
        </div>
        <div className="recent-chats">
          {recentChats.map((chat, index) => (
            <div key={index} className="chat-item">
              <div className="profile-pic">{chat.name[0]}</div>
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-message">{chat.message}</div>
              </div>
              <div className="chat-time">{chat.time}</div>
              {chat.unreadCount && <span className="unread-count">{chat.unreadCount}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="header-name"> عبدالله بن نواف</div>
        </div>
        <div className="chat-content">
          <div className="message received">
            <span className="message-text">Images</span>
         
            <div className="message-time">10:30</div>
          </div>
          <div className="message sent">
            <span className="message-text">admin_v1.0.zip</span>
            <div className="message-time">01:30</div>
          </div>
        </div>

        {/* Message Input */}
        <div className="message-input">
          <input type="text" placeholder="Enter Message..." />
          <button className="send-button">{t("send")}</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
