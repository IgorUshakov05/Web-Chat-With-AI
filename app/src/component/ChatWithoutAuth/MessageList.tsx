import { observer } from "mobx-react";
import MessageTemplate from "./Message";
import { chatStoreWithoutAuth } from "../../store/withoutAuth";
import { useEffect, useRef } from "react";
import LoadingMessage from "../СhatComponent/LoadingMessage";
import YandexAdBlock from "../UX/AdsSlide";

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
      <YandexAdBlock blockId="R-A-15374861-7"/>
      <div className="messagesAndAds">
        {chatStoreWithoutAuth.messages.map((itemMessage, index) => (
          <MessageTemplate
            key={index}
            data={{ message: itemMessage.message, sender: itemMessage.sender }}
          />
        ))}
        {chatStoreWithoutAuth.isPending && <LoadingMessage />}
      </div>
    </div>
  );
}

export default observer(MessageList);
