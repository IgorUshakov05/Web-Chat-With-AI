import { observer } from "mobx-react";
import useMessageWithOutAuth from "../../hook/useMessageWithOutAuth";
import { chatStoreWithoutAuth } from "../../store/withoutAuth";
import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";

function Chat() {
  const { mutate, isPending } = useMessageWithOutAuth(
    chatStoreWithoutAuth.message
  );
  const [emptyMessage] = useState([
    {
      color: "red",
      text: "Напиши программу на Python",
      bottom: "0",
      left: "10%",
      top: "12%",
    },
    {
      color: "red",
      text: "Придумай сценарий для видео",
      bottom: "0",
      left: "0",
      top: "58%",
    },
    {
      color: "red",
      text: "В чем легендарность команды HuntTeam?",
      bottom: "0",
      left: "55%",
      top: "5%",
    },
    { color: "red", text: "Кто ты?", bottom: "50%", left: "90%", top: "40%" },
    {
      color: "red",
      text: "Сделай отчет",
      bottom: "0",
      left: "76%",
      top: "64%",
    },
  ]);
  function handelInput(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    chatStoreWithoutAuth.inputMessage(value);
  }
  useEffect(() => {
    chatStoreWithoutAuth.setIsWait(isPending);
  }, [isPending]);
  async function handelSubmit() {
    if (chatStoreWithoutAuth.message.length === 0) return;
    await chatStoreWithoutAuth.setOneMessage({
      message: chatStoreWithoutAuth.message,
      sender: "User",
    });
    await mutate(undefined, {
      onSuccess: (response) => {
        chatStoreWithoutAuth.setOneMessage({
          message: response.message,
          sender: "Bot",
        });
      },
      onError: (data) => {
        chatStoreWithoutAuth.setOneMessage({
          message: "С начала авторизируйтесь",
          sender: "Bot",
        });
      },
    });
    chatStoreWithoutAuth.clear();
  }

  return (
    <div className="chat-container">
      {chatStoreWithoutAuth.messages.length === 0 ? (
        <>
          <EmptyChat />
          {emptyMessage.map((example, index) => (
            <RequestsExample
              key={index}
              color={example.color}
              text={example.text}
              bottom={example.bottom}
              left={example.left}
              top={example.top}
            />
          ))}
        </>
      ) : (
        <MessageList />
      )}


      <div className="chat-footer">
        <input
          type="text"
          onInput={handelInput}
          value={chatStoreWithoutAuth.message}
          className="inputInEmpty"
          maxLength={1000}
          placeholder="Введите запрос..."
        />
        {!!chatStoreWithoutAuth.message.length && !isPending && (
          <button
            className="buttonInEmpty"
            aria-label="Отправить запрос"
            disabled={chatStoreWithoutAuth.message.length === 0 || isPending}
            onClick={handelSubmit}
          >
            <svg
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.830963 5.10215L0.432295 1.31481C0.352639 0.558079 1.1339 0.00728211 1.81989 0.336553L22.7667 10.391C23.4955 10.7408 23.5038 11.7755 22.7808 12.1371L1.84842 22.6032C1.15927 22.9478 0.362264 22.3921 0.447351 21.6263L0.837041 18.1191C1.06726 16.0471 2.59303 14.3526 4.62961 13.9071L14.2427 11.8042C14.7683 11.6893 14.7454 10.9321 14.2138 10.8491L4.91492 9.3961C2.73769 9.05591 1.06165 7.29369 0.830963 5.10215Z"
                fill="#232DFC"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyChat() {
  return (
    <div className="empty-chat">
  <img src="/HuntAIText.webp" alt="" />
    </div>
  );
}

function RequestsExample({
  text,
  color,
  top,
  left,
  bottom,
}: {
  text: string;
  color: string;
  top: string;
  left: string;
  bottom: string;
}) {
  return (
    <div
      className="requests-example"
      style={{
        top: top,
        left: left,
        bottom: bottom,
      }}
    >
      {text}
    </div>
  );
}

export default observer(Chat);
