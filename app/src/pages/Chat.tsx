import React, { useEffect } from "react";
import Header from "../component/Header";
import MessageTemplate from "../component/СhatComponent/Message";
import Aside from "../component/СhatComponent/Aside";
import Input from "../component/СhatComponent/Input";
import useCurrentChat from "../hook/GetCurrentChat";
import { useLocation } from "react-router-dom";
import { chatStore } from "../store";
import { observer } from "mobx-react";
const ChatPage: React.FC = () => {
  const location = useLocation();
  const { data } = useCurrentChat(location.pathname.split("/")[2]);
  useEffect(() => {
    const newChatID = location.pathname.split("/")[2];
    chatStore.setChatID(newChatID);
  }, [location.pathname]);

  useEffect(() => {
    if (data?.chat.message) {
      chatStore.setMessages(data.chat.message);
    }
  }, [data]);

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Aside />

        <section className="chat-area">
          <div className="chat-messages">
            {chatStore.messages.map((msg, index) => (
              <MessageTemplate
                key={index}
                data={{
                  sender: msg.sender,
                  text: msg.text,
                  timestamp: msg.timestamp,
                }}
              />
            ))}
          </div>
          <Input />
        </section>
      </main>
    </div>
  );
};

export default observer(ChatPage);
