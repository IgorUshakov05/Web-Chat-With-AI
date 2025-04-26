import { observer } from "mobx-react";
import MessageTemplate from "./Message";
import { chatStoreWithoutAuth } from "../../store/withoutAuth";
import { useEffect, useRef } from "react";
import LoadingMessage from "../СhatComponent/LoadingMessage";

function MessageList() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatStoreWithoutAuth.messages, chatStoreWithoutAuth.isPending]);

  return (
    <div className="message-list" ref={listRef}>
      {chatStoreWithoutAuth.messages.map((itemMessage, index) => (
        <MessageTemplate
          key={index}
          data={{ message: itemMessage.message, sender: itemMessage.sender }}
        />
      ))}
      {chatStoreWithoutAuth.isPending && <LoadingMessage />}
    </div>
  );
}

export default observer(MessageList);
