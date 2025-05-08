import { observer } from "mobx-react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import YandexAd from "../component/UX/AdsBlock";
import ChatWithoutAuth from "../component/ChatWithoutAuth/Container";
import { lazy, Suspense } from "react";
import freeImg from "../static/free.webp";
import chainImg from "../static/Цепь.webp";
import alarmImg from "../static/Будильник.webp";
import illustrationImg from "../static/Илюстрация.webp";
import huntAILogo from "../static/HuntAIText.webp";
import imgAI from "../static/Img-AI.webp";
import snakeImg from "../static/Snake.webp";
import webHuntSvg from "../static/WebHunt.svg";
import webHuntImg from "../static/WebHUnt.webp";
import countryHuntSvg from "../static/CountryHunt.svg";
import countryHuntImg from "../static/Img-Country.webp";
import IndexMeta from "../Meta/Index";
const Join = lazy(() => import("../component/UX/Join"));

function IndexPage() {
  return (
    <>
      <IndexMeta />
      <Header />
      <main>
        <ChatWithoutAuth />
        <section className="p2">
          <div className="left-panel">
            <div className="kartochka">
              <div>
                <h2 className="name-plus">Бесплатное использование</h2>
                <p className="comand-text rte">
                  Общайтесь с ИИ столько, сколько вам нужно
                </p>
              </div>
              <div className="img-block">
                <img
                  src={freeImg}
                  alt="Бесплатное общение с ИИ"
                  className="img-free"
                />
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div className="kartochka">
              <div>
                <h2 className="name-plus">Гибкость и свобода</h2>
                <p className="comand-text rte">
                  Общайтесь с ИИ на любые темы без ограничений
                </p>
              </div>
              <div className="img-block">
                <img src={chainImg} alt="Разорванная цепь — символ свободы" />
              </div>
            </div>

            <div className="kartochka">
              <div>
                <h2 className="name-plus">Доступ в любое время</h2>
                <p className="comand-text rte">
                  ИИ доступен 24/7 — ночью и днём
                </p>
              </div>
              <div className="img-block" style={{display:'flex', alignItems: 'flex-end'}}>
                <img
                  src={alarmImg}
                  alt="Будильник — доступность круглосуточно"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="sektor-container fle">
          <article className="sektor-gaza bot">
            <div>
              <h2 className="name-plus">Создание и редактирование текстов</h2>
              <p className="comand-text rte">
                Генерация статей, постов, рекламных материалов, сценариев и
                рассказов
              </p>
            </div>
            <div>
              <h2 className="name-plus">Программирование</h2>
              <p className="comand-text rte">
                Написание, отладка и перевод кода на разные языки
              </p>
            </div>
          </article>
          <div className="ill">
            <img
              src={illustrationImg}
              alt="Иллюстрация возможностей ИИ"
              className="img-illustration"
            />
          </div>
          <article className="sektor-gaza bot">
            <div>
              <h2 className="name-plus">Образование и обучение</h2>
              <p className="comand-text rte">
                Объяснение сложных тем, создание учебных материалов и тестов
              </p>
            </div>
            <div>
              <h2 className="name-plus">Поиск информации и аналитика</h2>
              <p className="comand-text rte">
                Быстрый поиск данных, анализ и краткие сводки
              </p>
            </div>
          </article>
        </section>

        <section className="cent">
          <h2 className="name-product center wid">
            <span className="color">У нас есть не только </span>
            <span className="gra">GPT</span>
          </h2>
          <div className="list-product">
            <div className="w40">
              <article className="block-content">
                <div className="centr-name l">
                  <h3 className="nazv">Hunt AI</h3>
                  <p className="text-ai">
                    Бесплатный чат с искусственным интеллектом
                  </p>
                </div>
                <div className="photo-product">
                  <img
                    src={huntAILogo}
                    className="logo-pla"
                    alt="Логотип Hunt AI"
                  />
                  <img src={imgAI} className="ai-img" alt="Интерфейс Hunt AI" />
                  <img
                    src={snakeImg}
                    className="ai-img snake"
                    alt="Модель змеи в интерфейсе"
                  />
                </div>
              </article>
              <article className="block-content">
                <div className="centr-name r">
                  <h3 className="nazv">Web Hunt</h3>
                  <p className="text-ai">
                    Платформа для веб-специалистов в СНГ
                  </p>
                </div>
                <div className="photo-product">
                  <img
                    src={webHuntSvg}
                    className="logo-pla"
                    alt="Логотип Web Hunt"
                  />
                  <img
                    src={webHuntImg}
                    className="ai-img"
                    alt="Интерфейс Web Hunt"
                  />
                </div>
              </article>
            </div>

            <article className="block-content">
              <div className="centr-name">
                <h3 className="nazv">Country Hunt</h3>
                <p className="text-ai">Поиск работы по всему миру</p>
              </div>
              <div className="photo-product fly">
                <img
                  src={countryHuntSvg}
                  className="logo-pla"
                  alt="Логотип Country Hunt"
                />
                <img
                  src={countryHuntImg}
                  className="ai-img"
                  alt="Интерфейс Country Hunt"
                />
              </div>
            </article>
          </div>
        </section>
        <Suspense>
          <Join />
        </Suspense>
      </main>
      <YandexAd blockID="R-A-15374861-1" />
      <Footer />
    </>
  );
}

export default observer(IndexPage);
