import { chatStore } from "../../store";
import { observer } from "mobx-react";
import ChatListLastMessage from "./ListLastMessage";
import { useNewChat } from "../../hook/NewChat";
import UserData from "./UserData";
import useAllChat from "../../hook/GetAllChats";
import { useEffect } from "react";
function Aside() {
  const { mutate } = useNewChat();
  const { data, isSuccess, isPending } = useAllChat();
  useEffect(() => {
    if (data?.chats) {
      chatStore.setChatList(data?.chats);
    }
  }, [data?.chats]);
  return (
    <aside className="sidebar sidebar--history">
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
              .reverse()
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
      <UserData />
    </aside>
  );
}

export default observer(Aside);
