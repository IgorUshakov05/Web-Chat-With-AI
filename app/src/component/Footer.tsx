export default function Footer():any {
  return (
   <footer className="futer" aria-label="Подвал сайта">
  <nav className="info" role="navigation" aria-label="Навигация в подвале">
    <div>
      <p className="razdel">Страницы</p>
      <p className="punkt"><a href="/developers">Разработчики</a></p>
      <p className="punkt"><a href="/products">Продукты</a></p>
      <p className="punkt"><a href="/our-products">Наши продукты</a></p>
    </div>
    <div>
      <p className="razdel">Юридическая ерунда</p>
      <p className="punkt"><a href="/privacy-policy">Политика конфиденциальности</a></p>
      <p className="punkt"><a href="/terms-of-use">Правила использования продукта</a></p>
    </div>
    <div>
      <p className="razdel">Сотрудничество</p>
      <p className="punkt">
        <a
          href="mailto:team@webhunt.ru"
          className="__cf_email__"
        >
          team@webhunt.ru
        </a>
      </p>
    </div>
    <div>
      <p className="razdel">Наблюдать за проектами</p>
      <p className="punkt"><a href="/privacy-policy">Политика конфиденциальности</a></p>
      <p className="punkt"><a href="/terms-of-use">Правила использования продукта</a></p>
    </div>
    <div>
      <p className="razdel">Связь для вопросов</p>
      <p className="punkt">
        <a
          href="mailto:support@example.com"
          className="__cf_email__"
        >
          support@webhunt.ru
        </a>
      </p>
    </div>
  </nav>

  <div className="footer-line" role="separator" aria-hidden="true"></div>

  <div className="info" role="contentinfo">
    <img src="logo.svg" alt="Логотип компании" className="logo" />
    <img src="SiteAbakan.svg" alt="Партнерский сайт SiteAbakan" className="SiteAbakan" />
    <button className="button-futer" aria-label="Дополнительные действия"></button>
  </div>
</footer>

  );
}
