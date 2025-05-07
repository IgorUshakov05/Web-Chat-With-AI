import { Helmet } from "react-helmet";

export default function DocumentationMeta() {
  const baseUrl = "https://hunt-ai.ru";
  return (
    <Helmet>
      <title>HuntAI - Документация</title>
      <meta
        name="description"
        content="Техническая документация для HuntAI: настройка axios, WebSocket API, аутентификация, маршруты и примеры кода для интегра figuraции чата с ИИ."
      />
      <meta property="og:title" content="HuntAI - Документация" />
      <meta
        property="og:description"
        content="Подробное руководство по настройке и использованию HuntAI. Узнайте, как интегрировать чат с ИИ, используя axios, Socket.IO и JWT-аутентификацию."
      />
      <meta property="og:image" content={`${baseUrl}/image.png`} />
      <meta property="og:url" content={`${baseUrl}/documentation`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="HuntAI - Документация" />
      <meta
        name="twitter:description"
        content="Изучите техническую документацию HuntAI: настройка API, WebSocket, аутентификация и примеры кода для создания чата с ИИ."
      />

      <meta name="twitter:image" content={`${baseUrl}/image.png`} />
      <script type="application/ld+json">
        {`
            {
              "@context": "http://schema.org",
              "@type": "WebPage",
              "name": "HuntAI - Документация",
              "url": \`${baseUrl}/\`documentation",
              "description": "Техническая документация для интеграции HuntAI. Руководство по настройке axios, WebSocket API, аутентификации и маршрутам.",
              "publisher": {
                "@type": "Organization",
                "name": "HuntAI",
                "url": \`${baseUrl}/\`
              }
            }
          `}
      </script>
    </Helmet>
  );
}
