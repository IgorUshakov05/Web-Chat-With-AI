import { Link } from "react-router-dom";
import { Chat } from "../../types/ChatMessages";
import Trash from "./Trash";
import { chatStore } from "../../store";

export default function ChatListLastMessage({
  messages,
}: {
  messages: Chat[];
}) {
  return (
    <div className="sidebar__list">
      {messages
        .filter((item) => item.id !== chatStore.chatID)
        .map((item, index) => (
          <Link
            to={`/chat/${item.id}`}
            className="history-item-no-activity"
            key={index}
          >
            <Trash id={item.id} />
            {item.message.text}
          </Link>
        ))}
    </div>
  );
}
