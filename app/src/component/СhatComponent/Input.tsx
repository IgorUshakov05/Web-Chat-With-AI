import { observer } from "mobx-react";
import { chatStore, socketStore } from "../../store";
import { useEffect } from "react";
import { SocketMessage } from "../../types/ChatMessages";

function Input() {
  const handelInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let value = e.currentTarget.value;
    socketStore.typing(value);
    return e;
  };
  useEffect(() => {
    socketStore.connect();
    return () => {
      socketStore.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log("Mess");
    socketStore.socket.on("message", (data: SocketMessage) => {
      console.log("📩 Получено сообщение с сервера:", data);
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
  const handelEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handelSend();
    }
  };
  const handelSend = () => {
    const msg = socketStore.message.trim();
    if (msg === "") return false;
    chatStore.setOneMessage({
      sender: "User",
      text: msg,
      timestamp: Date.now(),
    });
    socketStore.sendMessage(chatStore.chatID, msg);
    socketStore.clearInput();
  };

  return (
    <div className="chat-input" id="chat-form">
      <textarea
        onKeyDown={handelEnterPress}
        value={socketStore.message}
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
    </div>
  );
}
export default observer(Input);
