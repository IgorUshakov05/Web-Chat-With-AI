import React from "react";
import { chatStore } from "../../store";
import { get_all_chats } from "../../api/Chat";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import NewChat from "./NewChat";

export default function ChatList() {
  const { data, isLoading, isError } = useQuery(["chat list"], get_all_chats, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  chatStore.setChatList(data?.chats || []);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-h-full max-w-full overflow-y-auto"
        role="alert"
      >
        <strong className="font-bold">Ошибка!</strong>
        <br />
        <span className="block sm:inline">Неудалось загрузить чаты</span>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-0.5 min-w-60 overflow-y-auto">
      <NewChat />
      {chatStore.chatList.map((chat, index) => (
        <li key={index}>
          <a
            className={`flex items-center py-1.5 text-nowrap overflow-hidden px-2.5 rounded-md align-middle select-none font-sans transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-stone-600 hover:text-stone-800 dark:hover:text-white hover:bg-stone-200 focus:bg-stone-200 focus:text-stone-800 dark:focus:text-white dark:data-[selected=true]:text-white dark:bg-opacity-70 ${
              String(chatStore.chatID) === String(chat.id)
                ? "border-2 border-black text-black"
                : "bg-red-500 border-2 border-white"
            }`}
            href={`/chat/${chat.id}`}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chat.message[chat.message.length - 1]?.text
              ?.slice(0, 25)
              .replace("#", "")
              .replace("```", "") || "Пустой чат"}
          </a>
        </li>
      ))}
    </ul>
  );
}
