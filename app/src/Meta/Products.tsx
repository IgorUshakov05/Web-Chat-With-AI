import { Helmet } from "react-helmet";

export default function ProductsMeta() {
  const baseUrl = "https://hunt-ai.ru";

  return (
    <Helmet>
      <title>HuntAI - Наши продукты</title>
      <meta
        name="description"
        content="Откройте для себя проекты HuntAI: WebHunt — платформа для поиска работы в веб-разработке, CountryHunt — глобальный поиск работы, и бесплатный ИИ-чат HuntAI."
      />
      <meta property="og:title" content="HuntAI - Наши продукты" />
      <meta
        property="og:description"
        content="Изучите продукты от команды HuntAI: WebHunt, CountryHunt и интеллектуальный ИИ-чат. Помогаем искать работу и создавать тексты с помощью ИИ."
      />
      <meta
        name="keywords"
        content="HuntAI, WebHunt, CountryHunt, ИИ чат, поиск работы, генерация текста, искусственный интеллект, AI продукты, нейросеть, генерация контента, разработка ИИ"
      />
      <meta property="og:image" content={`${baseUrl}/product-preview.png`} />
      <meta property="og:url" content={`${baseUrl}/products`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="HuntAI - Наши продукты" />
      <meta
        name="twitter:description"
        content="Ознакомьтесь с продуктами HuntAI: WebHunt — платформа поиска работы, CountryHunt — глобальный найм, и ИИ-чат для создания контента."
      />
      <meta name="twitter:image" content={`${baseUrl}/product-preview.png`} />

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "HuntAI - Наши продукты",
            "url": "${baseUrl}/products",
            "description": "Проекты HuntAI: WebHunt для поиска работы в сфере веб-разработки, международная платформа CountryHunt и бесплатный ИИ-чат HuntAI для создания текстов.",
            "publisher": {
              "@type": "Organization",
              "name": "HuntAI",
              "url": "${baseUrl}"
            }
          }
        `}
      </script>
    </Helmet>
  );
}
