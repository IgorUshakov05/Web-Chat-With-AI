import { observer } from "mobx-react";
import MessageTemplate from "./Message";
import { chatStoreWithoutAuth } from "../../store/withoutAuth";
import { useEffect, useRef } from "react";
import LoadingMessage from "../СhatComponent/LoadingMessage";
import YandexAdBlock from "../UX/AdsSlide";
import ErrorMessage from "../СhatComponent/ErrorMessage";

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
  }, [chatStoreWithoutAuth.messages, chatStoreWithoutAuth.isWait]);

  return (
    <div className="message-list">
      <YandexAdBlock
        blockId="R-A-15374861-7"
        defaultMaxHeight="600px"
        defaultMaxWidth="300px"
        mobileMaxHeight="150px"
        mobileMaxWidth="970px"
      />
      <div className="messagesAndAds" ref={listRef}>
        {chatStoreWithoutAuth.messages.map((itemMessage, index) =>
          itemMessage.message === "Ошибка сервера" ||  itemMessage.message === "Сначала авторизируйтесь"? (
            <ErrorMessage />
          ) : (
            <MessageTemplate
              key={index}
              data={{
                message: itemMessage.message,
                sender: itemMessage.sender,
              }}
            />
          )
        )}
        {chatStoreWithoutAuth.isWait && <LoadingMessage />}
      </div>
    </div>
  );
}

export default observer(MessageList);
