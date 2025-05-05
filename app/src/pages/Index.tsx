import { observer } from "mobx-react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import YandexAd from "../component/UX/AdsBlock";
import ChatWithoutAuth from "../component/ChatWithoutAuth/Container";
import { lazy, Suspense } from "react";
import IndexMeta from "../Meta/Index";
const Join = lazy(() => import("../component/UX/Join"));

function IndexPage() {
  return (
    <>
      <IndexMeta />
      <Header />
      <ChatWithoutAuth />
      <div className="p2">
        <div className="left-panel">
          <div className="kartochka">
            <div>
              <h3 className="name-plus">Бесплатное использование</h3>
              <p className="comand-text rte">
                Общайтесь с ИИ столько, сколько вам нужно
              </p>
            </div>
            <div className="img-block">
              <img src="free.png" alt="Изображение" className="img-free" />
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="kartochka">
            <div>
              <h3 className="name-plus">Бесплатное использование</h3>
              <p className="comand-text rte">
                Общайтесь с ИИ столько, сколько вам нужно
              </p>
            </div>
            <div className="img-block">
              <img src="Цепь.png" alt="Изображение" />
            </div>
          </div>

          <div className="kartochka">
            <div>
              <h3 className="name-plus">Бесплатное использование</h3>
              <p className="comand-text rte">
                Общайтесь с ИИ столько, сколько вам нужно
              </p>
            </div>
            <div className="img-block">
              <img src="Будильник.png" alt="Изображение" />
            </div>
          </div>
        </div>
      </div>

      <div className="sektor-container fle ">
        <div className="sektor-gaza bot">
          <div>
            <h3 className="name-plus">Создание и редактирование текстов</h3>
            <p className="comand-text rte">
              Генерация статей, постов для социальных сетей и рекламных
              материалов.Написание сценариев, стихотворений и рассказов.
            </p>
          </div>
          <div>
            <h3 className="name-plus">Программирование</h3>
            <p className="comand-text rte">
              Написание и отладка программного кода на различных языках
              программирования.Перевод кода с одного языка на другой.
            </p>
          </div>
        </div>
        <div className="ill">
          <img
            src="Илюстрация.png"
            alt="Изображение"
            className="img-illustration"
          />
        </div>
        <div className="sektor-gaza bot">
          <div>
            <h3 className="name-plus">Образование и обучение</h3>
            <p className="comand-text rte">
              Объяснение сложных концепций и понятий. Создание учебных
              материалов и тестовых заданий
            </p>
          </div>
          <div>
            <h3 className="name-plus">Поиск информации и аналитика</h3>
            <p className="comand-text rte">
              Предоставление ответов на различные вопросы и поиск данных. Анализ
              и обобщение информации по заданной теме
            </p>
          </div>
        </div>
      </div>

      <div className="cent">
        <h1 className="name-product center wid">
          <span className="color"> У нас есть не только </span>
          <span className="gra">GPT</span>
        </h1>
        <div className="list-product">
          <div className="block-content">
            <div className="centr-name">
              <h3 className="nazv">Hunt AI</h3>
              <p className="text-ai">
                Бесплатный чат с искусственным интеллектом
              </p>
            </div>
            <div className="photo-product">
              <img src="HuntAI.svg" className="logo-pla" alt="" />
              <img src="Img-AI.png" className="ai-img" alt="" />
              <img src="Snake.png" className="ai-img snake" alt="" />
            </div>
          </div>
          <div className="block-content">
            <div className="centr-name">
              <h3 className="nazv">Web Hunt</h3>
              <p className="text-ai">Работа для Веб специалистов в СНГ </p>
            </div>
            <div className="photo-product">
              <img src="WebHunt.svg" className="logo-pla" alt="" />
              <img src="WebHUnt.png" className="ai-img" alt="" />
            </div>
          </div>
          <div className="block-content">
            <div className="centr-name">
              <h3 className="nazv">Country Hunt</h3>
              <p className="text-ai">Поиск работы по всему миру</p>
            </div>
            <div className="photo-product">
              <img src="CountryHunt.svg" className="logo-pla" alt="" />
              <img src="Img-Country.png" className="ai-img" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        <Join />
      </Suspense>
      {/* <YandexAd blockID="R-A-15374861-1" /> */}
      <Footer />
    </>
  );
}

export default observer(IndexPage);
