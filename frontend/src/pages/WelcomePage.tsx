import React from "react";
import Header from "../components/Header";
import CTAction from "../components/CTA";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet";
import { useAuthorization } from "../hook/Auth";
import { authStore } from "../store/index";
import Feature from "../components/Feature";
import YandexAd from "../components/Ads";

const HomePage = observer(() => {
  let { data } = useAuthorization();
  authStore.setAuth(data?.success);
  return (
    <>
      <Helmet>
        <title>Hunt AI — Бесплатная нейронка</title>
        <meta
          name="description"
          content="Hunt AI — бесплатный аналог ChatGPT на русском языке. Используйте нашу нейросеть для генерации текстов, ответов на вопросы и автоматизации работы."
        />

        <meta
          name="keywords"
          content="Hunt AI, бесплатная нейронка, ChatGPT на русском, нейросеть, AI, генерация текста, искусственный интеллект, GPT-4, нейросетевые технологии"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Hunt AI — Бесплатная нейронка" />
        <meta
          property="og:description"
          content="Используйте Hunt AI — бесплатную нейросеть на русском языке для генерации текстов и ответов на вопросы."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chat.webhunt.ru/" />
        <meta
          property="og:image"
          content="https://chat.webhunt.ru/preview.png"
        />
        <link rel="canonical" href="https://chat.webhunt.ru" />

        <script>window.yaContextCb=window.yaContextCb||[]</script>
        <script src="https://yandex.ru/ads/system/context.js" async></script>
      </Helmet>

      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Header />
        <main>
          <CTAction />
          <Feature />
          <YandexAd blockId="R-A-14408229-1" />
        </main>
        <footer className="p-4 text-center bg-gray-200">
          &copy; {new Date().getFullYear()} Hunt AI — Бесплатная нейронка
        </footer>
      </div>
    </>
  );
});

export default HomePage;
