import { chatStore } from "../../store";
import { observer } from "mobx-react";
import ChatListLastMessage from "./ListLastMessage";
import { useNewChat } from "../../hook/NewChat";
import UserData from "./UserData";
import useAllChat from "../../hook/GetAllChats";
import { useEffect } from "react";
function Aside() {
  const { mutate } = useNewChat();
  const { data, isSuccess, isPending, isError } = useAllChat();
  useEffect(() => {
    setTimeout(() => {
      console.log(data);
    }, 1000);
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

        <ChatListLastMessage
          messages={[
            {
              id: "12123123",
              message: {
                sender: "Bot",
                text: "Hello",
                timestamp: 11212,
                success: true,
              },
            },
          ]}
        />
      </div>
      <UserData />
    </aside>
  );
}

export default observer(Aside);
