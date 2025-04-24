import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";

import Header from "../component/Header";
import Aside from "../component/СhatComponent/Aside";
import Input from "../component/СhatComponent/Input";
import MessageTemplate from "../component/СhatComponent/Message";
import { useNavigate } from "react-router-dom";
import Spinner from "../component/СhatComponent/Spin";

import useCurrentChat from "../hook/GetCurrentChat";
import { chatStore } from "../store";

const ChatPage: React.FC = () => {
  const location = useLocation();
  const chatID = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { data, isPending, isSuccess } = useCurrentChat(chatID);

  useEffect(() => {
    chatStore.setChatID(chatID);
    if (isSuccess && data?.chat.message) {
      chatStore.setMessages(data.chat.message);
    }
  }, [chatID, data, isSuccess, navigate]);

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Aside />
        <section className="chat-area">
          <div
            className="chat-messages"
            style={{ justifyContent: isPending ? "center" : "flex-start" }}
          >
            {isPending ? (
              <Spinner />
            ) : (
              chatStore.messages.map((msg, index) => (
                <MessageTemplate
                  key={index}
                  data={{
                    sender: msg.sender,
                    text: msg.text,
                    timestamp: msg.timestamp,
                  }}
                />
              ))
            )}
          </div>
          {!isPending && <Input />}
        </section>
      </main>
    </div>
  );
};

export default observer(ChatPage);
