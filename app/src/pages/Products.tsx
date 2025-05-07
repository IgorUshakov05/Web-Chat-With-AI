import Footer from "../component/Footer";
import Header from "../component/Header";
import ProductsMeta from "../Meta/Products";

export default function ProductsPage() {
  return (
    <>
      <ProductsMeta />
      <Header />

      <div className="webhunt-img">
        <div>
          <div className="verh-web">
            <h2 className="name-platform">WebHunt</h2>
            <div className="sub">
              <img src="Кирка.svg" alt="Logo" className="logo-web" />
              <p className="sub-state">В разработке</p>
            </div>
          </div>
          <h1 className="name-product">
            <span>Платформа для поиска работы в сфере</span>
            <span className="spher"> веб-разработки</span>
          </h1>
        </div>
        <div className="img-wenhunt">
          <img
            src="img-wenhunt.webp"
            alt="Web Chat With AI"
            className="img-wenhunt"
          />
        </div>
      </div>

      <div className="sektor-container">
        <div className="sektor-gaza">
          <div className="opis">
            <div className="verh-opis">
              <img src="time.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Простота и скорость</p>
            </div>
            <hr />
            <p className="verh-opis">
              Интуитивный интерфейс позволяет находить нужных специалистов или
              проекты за считанные минуты.
            </p>
          </div>
          <div className="opis">
            <div className="verh-opis">
              <img src="security.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Безопасность</p>
            </div>
            <hr />
            <p className="verh-opis">
              Все данные защищены благодаря строгой валидации и современным
              стандартам шифрования.
            </p>
          </div>
        </div>
        <div className="comand">
          <div className="nazvanye">
            <p className="name-comand">Почему</p>
            <p className="name-comand-blue">WebHunt</p>
            <p className="name-comand">?</p>
          </div>
          <p className="comand-text">
            это современная веб-платформа, созданная для эффективного соединения
            IT-специалистов и работодателей. Мы упрощаем процесс поиска работы и
            найма, предоставляя удобный и интуитивный инструмент, который
            отвечает потребностям обеих сторон. Независимо от того, ищете ли вы
            талантливого разработчика или мечтаете о новой карьере в IT, WebHunt
            станет вашим надёжным помощником.
          </p>
        </div>
        <div className="sektor-gaza">
          <div className="opis">
            <div className="verh-opis">
              <img src="time.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Простота и скорость</p>
            </div>
            <hr />
            <p className="verh-opis">
              Интуитивный интерфейс позволяет находить нужных специалистов или
              проекты за считанные минуты.
            </p>
          </div>
          <div className="opis">
            <div className="verh-opis">
              <img src="hp.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Премиум-возможности</p>
            </div>
            <hr />
            <p className="verh-opis">
              Подписка "HuntPremium" убирает рекламу и выделяет ваш профиль или
              вакансии, повышая шансы на успех.
            </p>
          </div>
        </div>
      </div>

      <div className="sektor-container top">
        <div className="sektor-gaza">
          <p className="forRab">Для специалистов</p>
          <div>
            <p className="Pre">
              Удобный поиск вакансий и краткосрочных заказов (Фаст-Ворк) с
              фильтрами по специализации, опыту, зарплате и географии.
            </p>
            <p className="Pre">
              Возможность создать профессиональный профиль с указанием навыков,
              портфолио и опыта, чтобы выделиться среди других кандидатов.
            </p>
            <p className="Pre">
              Прямое общение с работодателями через встроенный чат и оперативные
              уведомления о статусе откликов.
            </p>
            <p className="Pre">
              Прямое общение с работодателями через встроенный чат и оперативные
              уведомления о статусе откликов.
            </p>
          </div>
        </div>

        <div className="comand">
          <img
            src="RabSpec.webp"
            alt="Web Chat With AI"
            className="wenhuntrab"
          />
        </div>

        <div className="sektor-gaza">
          <p className="forRab">Для работодателей</p>
          <div>
            <p className="Pre">
              Быстрый доступ к базе IT-специалистов с гибкой фильтрацией по
              навыкам, опыту и местоположению.
            </p>
            <p className="Pre">
              Публикация вакансий и Фаст-Ворк с детальным описанием требований и
              условий.
            </p>
            <p className="Pre">
              Управление компанией: регистрация, добавление сотрудников и
              создание внутренних уведомлений в чате.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="CountryHunt">
          <h2 className="name-platform">CountryHunt</h2>
          <h1 className="name-product center">
            <span className="spher">Международная</span>
            <span> платформа для поиска работы</span>
          </h1>
          <img
            src="Planet.webp"
            alt="Web Chat With AI"
            className="img-countryhunt"
          />
        </div>

        <div className="sektor-centr">
          <div className="opis centr">
            <div className="verh-opis">
              <img src="time.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Простота и скорость</p>
            </div>
            <hr />
            <p className="verh-opis">
              Интуитивный интерфейс позволяет находить нужных специалистов или
              проекты за считанные минуты.
            </p>
          </div>
          <div className="opis centr">
            <div className="verh-opis">
              <img src="security.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Безопасность</p>
            </div>
            <hr />
            <p className="verh-opis">
              Все данные защищены благодаря строгой валидации и современным
              стандартам шифрования.
            </p>
          </div>
          <div className="opis centr">
            <div className="verh-opis">
              <img src="security.svg" alt="Logo" className="logo-opis" />
              <p className="opis-text">Безопасность</p>
            </div>
            <hr />
            <p className="verh-opis">
              Все данные защищены благодаря строгой валидации и современным
              стандартам шифрования.
            </p>
          </div>
        </div>

        <div className="sektor-centr-top">
          <div className="CountryOpisanye">
            <h2 className="opis-text op">Что за платформа</h2>
            <p className="verh-opis opisanye">
              CountryHunt – это глобальная платформа для поиска работы, которая
              объединяет специалистов и работодателей со всего мира. Ее главная
              цель – максимально упростить процесс найма и коммуникацию между
              компаниями и соискателями
            </p>
            <div className="sub state">
              <img src="Кирка.svg" alt="Logo" className="logo-web" />
              <p className="sub-state">В разработке</p>
            </div>
          </div>
          <img src="Coun.svg" alt="Web Chat With AI" className="ContryImg" />
        </div>

        <div className="huntAI-block">
          <div className="huntAI-block-title">
            <h2 className="name-platform">HuntAI</h2>
            <h1 className="name-product">
              <span className="spher">Бесплатный</span>
              <span className="ii">ИИ чат</span>
            </h1>
          </div>
          <div className="huntAI-block-l">
            <div className="sektor-gaza">
              <div className="ai-opis">
                <div className="verh-opis pad">
                  <img src="hp.svg" alt="Logo" className="logo-opis" />
                </div>
                <div className="inf">
                  <p className="opis-text nigger">
                    Создание и редактирование текстов
                  </p>
                  <p className="verh-opis te">
                    От статей и рекламных материалов до постов для соцсетей.
                  </p>
                </div>
              </div>
              <div className="ai-opis">
                <div className="verh-opis pad">
                  <img src="hp.svg" alt="Logo" className="logo-opis" />
                </div>
                <div className="inf">
                  <p className="opis-text nigger">
                    Создание и редактирование текстов
                  </p>
                  <p className="verh-opis te">
                    От статей и рекламных материалов до постов для соцсетей.
                  </p>
                </div>
              </div>
              <div className="ai-opis">
                <div className="verh-opis pad">
                  <img src="hp.svg" alt="Logo" className="logo-opis" />
                </div>
                <div className="inf">
                  <p className="opis-text nigger">
                    Создание и редактирование текстов
                  </p>
                  <p className="verh-opis te">
                    От статей и рекламных материалов до постов для соцсетей.
                  </p>
                </div>
              </div>
              <div className="ai-opis">
                <div className="verh-opis pad">
                  <img src="hp.svg" alt="Logo" className="logo-opis" />
                </div>
                <div className="inf">
                  <p className="opis-text nigger">
                    Создание и редактирование текстов
                  </p>
                  <p className="verh-opis te">
                    От статей и рекламных материалов до постов для соцсетей.
                  </p>
                </div>
              </div>
            </div>
            <img src="AIHunt.webp" alt="Web Chat With AI" className="AIHunt" />
            <div className="sektor-gaza bottom">
              <p className="verh-opis opisanye">
                Это интеллектуальная платформа для создания и редактирования
                текстов, созданная для тех, кто ценит скорость, удобство и
                качество.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
