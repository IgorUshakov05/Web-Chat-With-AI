import { useEffect } from "react";
import useAllChat from "../../hook/GetAllChats";
import { useNewChat } from "../../hook/NewChat";
import { chatStore } from "../../store";
import ChatListLastMessage from "./ListLastMessage";
import { observer } from "mobx-react";

function History() {
  const { data, isSuccess, isPending } = useAllChat();
  useEffect(() => {
    if (data?.chats) {
      chatStore.setChatList(data?.chats);
    }
  }, [data?.chats]);
  const { mutate } = useNewChat();
  return (
    <div className="history">
      <div className="sidebar__top">
        <p className="text">История</p>
        <button className="button_header_common" onClick={() => mutate()}>
          Новый чат
        </button>
      </div>
      {isPending && (
        <div className="sidebar__list">
          {Array.from({ length: 10 }).map((_, index) => (
            <p className="history-item-no-activity empty" key={index}></p>
          ))}
        </div>
      )}
      {isSuccess && data.chats && (
        <ChatListLastMessage
          messages={chatStore.chatList
            .filter((item) => item.lastMessage !== undefined)
            .sort((a, b) => a.lastMessage.timestamp - b.lastMessage.timestamp)
            .map((item) => ({
              id: item.id,
              message: {
                sender: item.lastMessage.sender,
                text: item.lastMessage.text,
                timestamp: item.lastMessage.timestamp,
                success: true,
              },
            }))}
        />
      )}
    </div>
  );
}
export default observer(History);
