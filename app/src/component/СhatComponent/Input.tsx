import { observer } from "mobx-react";
import { chatStore, socketStore } from "../../store";
import { useEffect, useRef } from "react";
import { SocketMessage } from "../../types/ChatMessages";

function Input() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handelInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    socketStore.typing(value);
    return e;
  };
  useEffect(() => {
    socketStore.socket.on("message", (data: SocketMessage) => {
      console.log("📩 Получено сообщение с сервера:", data);
      if (data.connection || data.from === "User") return;
      socketStore.setWait(false);
      chatStore.setOneMessage({
        sender: data.from,
        timestamp: data.timestamp,
        text: data.text,
      });
    });
    socketStore.clearInput();

    return () => {
      socketStore.socket.off("message");
    };
  }, []);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    socketStore.connect();
    socketStore.socket.on("error", (err) => {
      console.error("Ошибка от сервера:", err.message);
    });

    socketStore.socket.emit("joinRoom", { room: chatStore.chatID });

    return () => {
      socketStore.socket.emit("leaveRoom", { room: chatStore.chatID });
      socketStore.disconnect();
    };
  }, [chatStore.chatID]);
  const handelEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handelSend();
    }
  };
  const handelSend = () => {
    const msg = socketStore.message.trim();
    if (msg === "" || socketStore.isWait) return false;
    chatStore.setOneMessage({
      sender: "User",
      text: msg,
      timestamp: Date.now(),
    });
    socketStore.setWait(true);

    socketStore.sendMessage(chatStore.chatID, msg);
    socketStore.clearInput();
  };

  return (
    <div className="chat-input" id="chat-form">
      <textarea
        onKeyDown={handelEnterPress}
        value={socketStore.message}
        ref={inputRef}
        onInput={handelInput}
        className="chat-input__textarea"
        placeholder="Введите запрос..."
      ></textarea>
      {socketStore.message && (
        <button
          type="submit"
          className="chat-input__button"
          onClick={handelSend}
        >
          <img src="/send.svg" alt="Send" />
        </button>
      )}
      {socketStore.isWait ? (
        <div className="buttonInEmpty">
          <div className="rel">
            <div className="star"></div>
            <div className="star1"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default observer(Input);
