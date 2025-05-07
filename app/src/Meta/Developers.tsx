import { Helmet } from "react-helmet";

export default function DevelopersMeta() {
  const baseUrl = "https://hunt-ai.ru";
  return (
    <Helmet>
      <title>HuntAI - Наша команда</title>
      <meta
        name="description"
        content="Познакомьтесь с командой HuntAI: разработчики, дизайнеры и энтузиасты, стоящие за созданием нейросетевых решений для бизнеса и повседневных задач."
      />
      <meta property="og:title" content="HuntAI - Наша команда" />
      <meta
        property="og:description"
        content="Узнайте больше о команде HuntAI, которая развивает искусственный интеллект и создает инновационные проекты для бизнеса и пользователей."
      />
      <meta
        property="og:image"
        content="https://hunt-ai.ru/preview.jpg"
      />
       <meta
        name="keywords"
        content="HuntAI, команда, разработчики, дизайнеры, искусственный интеллект, нейросети, ИИ для бизнеса, технологии, инновационные проекты, разработка ИИ, AI solutions"
      />
      <meta
        property="og:url"
        content={`${baseUrl}/developers`}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="HuntAI - Наша команда" />
      <meta
        name="twitter:description"
        content="Откройте для себя команду HuntAI — разработчиков и дизайнеров, создающих инновационные нейросетевые проекты."
      />
      <meta
        name="twitter:image"
        content="https://hunt-ai.ru/preview.jpg"
      />

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "HuntAI - Наша команда",
            "url": "${baseUrl}/developers",
            "description": "Познакомьтесь с нашей командой, создающей искусственный интеллект HuntAI и другие проекты экосистемы WebHunt.",
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
