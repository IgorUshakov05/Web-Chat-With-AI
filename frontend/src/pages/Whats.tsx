import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import { authStore } from "../store";
import "highlight.js/styles/github.css";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import style from "../style/Markdown.module.css";
import markdownContent from "../components/MarkDows";

const Poprikolu: React.FC = () => {
  authStore.setAuth(localStorage.getItem("access") ? true : false);
  
  return (
    <>
      <Helmet>
        <title>Документация</title>
        <meta name="description" content="Поприколу — Hunt AI" />
        <meta
          name="keywords"
          content="Поприколу, нейросеть, Hunt AI, бесплатный доступ, Документация, генерация текста, искусственный интеллект"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Документация" />
        <meta
          property="og:description"
          content="Используйте Hunt AI для генерации текста. Бесплатный доступ и поддержка русского языка."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chat.webhunt.ru/poprikolu" />
        <meta
          property="og:image"
          content="https://chat.webhunt.ru/preview.png"
        />
        <link rel="canonical" href="https://chat.webhunt.ru/poprikolu" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-grow flex-col justify-center px-4 mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
            <img src="https://camo.githubusercontent.com/ff9f42be528d8de2d245086248bdb3a357e687aaa81bb3eeaf26ef05a920b10c/68747470733a2f2f636861742e77656268756e742e72752f707265766965772e706e67" alt="Превью" />
          <Markdown
            className={`${style.markdownText} flex gap-5 flex-col pt-5 pb-5`}
            rehypePlugins={[rehypeHighlight, remarkGfm]}
          >{markdownContent}</Markdown>
        </main>
      </div>
    </>
  );
};

export default Poprikolu;
