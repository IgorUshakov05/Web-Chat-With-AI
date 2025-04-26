import { observer } from "mobx-react";
import MessageTemplate from "./Message";
import { chatStoreWithoutAuth } from "../../store/withoutAuth";

function MessageList() {
  return (
    <div className="message-list">
      {chatStoreWithoutAuth.messages.map((itemMessage, index) => (
        <MessageTemplate
          key={index}
          data={{ message: itemMessage.message, sender: itemMessage.sender }}
        />
      ))}
    </div>
  );
}

export default observer(MessageList);
