export default function Footer(): any {
  return (
    <footer className="futer" aria-label="Подвал сайта">
      <nav className="info" role="navigation" aria-label="Навигация в подвале">
        <div>
          <p className="razdel">Страницы</p>
          <p className="punkt">
            <a href="/developers">Разработчики</a>
          </p>
          <p className="punkt">
            <a href="/products">Продукты</a>
          </p>
          <p className="punkt">
            <a href="/documentation">Документация</a>
          </p>
        </div>
        <div>
          <p className="razdel">Юридическая информация</p>
          <p className="punkt">
            <a href="/privacy-policy">Политика конфиденциальности</a>
          </p>
          <p className="punkt">
            <a href="/terms-of-use">Правила использования продукта</a>
          </p>
        </div>
        <div>
          <p className="razdel">Сотрудничество</p>
          <p className="punkt">
            <a href="mailto:team@webhunt.ru" className="__cf_email__">
              team@webhunt.ru
            </a>
          </p>
        </div>
        <div>
          <p className="razdel">Связь для вопросов</p>
          <p className="punkt">
            <a href="mailto:support@webhunt.ru" className="__cf_email__">
              support@webhunt.ru
            </a>
          </p>
        </div>
      </nav>

      <section className="sitemap" aria-label="Карта сайта">
        <p className="razdel">Карта сайта</p>
        <ul className="sitemap-list">
          <li>
            <a href="/">Главная</a>
          </li>
          <li>
            <a href="/developers">Разработчики</a>
          </li>
          <li>
            <a href="/products">Продукты</a>
          </li>
          <li>
            <a href="/documentation">Документация</a>
          </li>
          <li>
            <a href="/privacy-policy">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="/terms-of-use">Правила использования</a>
          </li>
        </ul>
      </section>

      <div className="footer-line" role="separator" aria-hidden="true"></div>

      <div className="info" role="contentinfo">
        <img src="/logo.svg" alt="Логотип компании" className="logo" />
        <img
          src="/SiteAbakan.svg"
          alt="Партнерский сайт SiteAbakan"
          className="SiteAbakan"
        />
        <button
          className="button-futer"
          aria-label="Дополнительные действия"
        ></button>
      </div>
    </footer>
  );
}
