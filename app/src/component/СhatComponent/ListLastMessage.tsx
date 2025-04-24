import { Link } from "react-router-dom";
import { Chat } from "../../types/ChatMessages";

export default function ChatListLastMessage({
  messages,
}: {
  messages: Chat[];
}) {
  return (
    <div className="sidebar__list">
      {messages.map((item, index) => (
        <Link
          to={`/chat/${item.id}`}
          className="history-item-no-activity"
          key={index}
        >
          {item.message.text}
        </Link>
      ))}
    </div>
  );
}
