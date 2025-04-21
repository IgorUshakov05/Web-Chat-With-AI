import React from "react";
import Header from "../component/Header";
import MessageTemplate from "../component/СhatComponent/Message";
import Aside from "../component/СhatComponent/Aside";
import Input from "../component/СhatComponent/Input";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Aside />

        <section className="chat-area">
          <div className="chat-messages">
            <MessageTemplate sender="User" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="Bot" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="User" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="Bot" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="User" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="Bot" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="User" text={"Hello"} timestamp={0} />
            <MessageTemplate sender="Bot" text={"Hello"} timestamp={0} />
          </div>
          <Input />
        </section>
      </main>
    </div>
  );
};

export default ChatPage;
