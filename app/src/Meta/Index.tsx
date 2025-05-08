import { Helmet } from "react-helmet";

export default function IndexMeta() {
  const baseUrl = "https://hunt-ai.ru";

  return (
    <Helmet>
      <title>HuntAI - бесплатная нейросеть</title>
      <meta
        name="description"
        content="HuntAI - бесплатный ИИ для создания текстов, программирования, поиска информации и обучения. Удобные инструменты для бизнеса и повседневных задач."
      />

      <meta
        property="og:title"
        content="HuntAI - Нейросеть для анализа данных и создания решений"
      />
      <meta
        property="og:description"
        content="HuntAI - мощный инструмент для решения задач с использованием ИИ: создание контента, анализ данных и разработка решений для бизнеса."
      />
      <meta property="og:image" content="https://hunt-ai.ru/preview.jpg" />

      <meta
        name="keywords"
        content="HuntAI, нейросеть, искусственный интеллект, генерация текста, чат с ИИ, генерация кода, ИИ для бизнеса, анализ данных, обучение, автоматизация, GPT, LLM, AI инструменты"
      />

      <meta property="og:url" content={baseUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="HuntAI - Нейросеть для анализа данных и создания решений"
      />
      <meta
        name="twitter:description"
        content="HuntAI - нейросеть, которая помогает бизнесу решать задачи с помощью ИИ. Генерация текста, программирование, аналитика и многое другое."
      />
      <meta name="twitter:image" content="https://hunt-ai.ru/preview.jpg" />

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HuntAI - Нейросеть для бизнеса и повседневных задач",
            "url": "${baseUrl}",
            "description": "HuntAI использует нейросети для анализа данных, создания контента и решения бизнес-задач. Простой и удобный ИИ для вашей компании.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${baseUrl}/search?q={search_term}",
              "query-input": "required name=search_term"
            }
          }
        `}
      </script>
    </Helmet>
  );
}
