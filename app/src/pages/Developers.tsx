import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import YandexAd from "../component/UX/AdsBlock";
import DevelopersMeta from "../Meta/Developers";
export default function DevelopersPage() {
  return (
    <>
      <DevelopersMeta />
      <Header />
      <div className="sektor-container">
        <article className="sektor">
          <div className="social-media">
            <Link to={"https://tenchat.ru/FullStack"} className="button-media">
              <img src="TenChat.svg" alt="TenChat" />
            </Link>
            <Link to={"https://vk.com/opex_shisha"} className="button-media">
              <img src="VK.svg" alt="VK" />
            </Link>
            <Link to={"https://t.me/O101O1O1O"} className="button-media">
              <img src="Telegram.svg" alt="Telegram" />
            </Link>
          </div>
          <img src="Игорь.png" alt="Игорь" className="photo-sektor" />
          <div className="social-media">
            <Link to={"https://dprofile.ru/fullstack"} className="button-media">
              <img src="DProfile.svg" alt="DProfile" />
            </Link>
            <div className="Name-text">
              <p className="name">Ушаков Игорь</p>
              <p className="special">Программист</p>
            </div>
            <Link
              to={"https://github.com/IgorUshakov05"}
              className="button-media"
            >
              <img src="github-logo 1.svg" alt="GitHub" />
            </Link>
          </div>
        </article>
        <article className="comand">
          <h1 className="nazvanye">
            <span className="name-comand">Команда</span>
            <span className="name-comand-blue">HuntTeam</span>
          </h1>
          <h2 className="comand-text">
            Наш искусственный интеллект и другие проекты нашей ЭКО-системы,
            например крупная платформа WebHunt, — это труд двух разработчиков.
            Оценить наши проекты и написать в соцсетях можно по ссылкам,
            указанным на этой странице.
          </h2>
        </article>
        <article className="sektor">
          <div className="social-media">
            <Link
              to={"https://tenchat.ru/YaroslavDesign"}
              className="button-media"
            >
              <img src="TenChat.svg" alt="TenChat" />
            </Link>
            <Link
              to={"https://vk.com/YaroslavUshakov"}
              className="button-media"
            >
              <img src="VK.svg" alt="VK" />
            </Link>
            <Link to={"https://t.me/YaroslavUshakov"} className="button-media">
              <img src="Telegram.svg" alt="Telegram" />
            </Link>
          </div>
          <img src="ЯрикФото.png" alt="Ярослав" className="photo-sektor" />
          <div className="social-media">
            <Link
              to={"https://dprofile.ru/yaroslavushakov"}
              className="button-media"
            >
              <img src="DProfile.svg" alt="DProfile" />
            </Link>
            <div className="Name-text">
              <p className="name">Ушаков Ярослав</p>
              <p className="special">Дизайнер</p>
            </div>
            <Link
              to={"https://www.behance.net/YaroslavUshakov"}
              className="button-media"
            >
              <img src="behance-163 1.svg" alt="Behance" />
            </Link>
          </div>
        </article>
      </div>
      <YandexAd blockID="R-A-15374861-3"  />

      <Footer />
    </>
  );
}
