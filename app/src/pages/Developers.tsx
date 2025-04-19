import Footer from '../component/Footer'
import Header from '../component/Header'
export default function DevelopersPage() {
    return <>
        <Header />
        <div className="sektor-container">
            <article className="sektor">
                <div className="social-media">
                    <button className="button-media"><img src="TenChat.svg" alt="TenChat" / ></button>
                    <button className="button-media"><img src="VK.svg" alt="VK" /></button>
                    <button className="button-media"><img src="Telegram.svg" alt="Telegram" /></button>
                </div>
                <img src="Игорь.png" alt="Игорь" className="photo-sektor" />
                <div className="social-media">
                    <button className="button-media"><img src="DProfile.svg" alt="DProfile" /></button>
                    <div className="Name-text">
                        <p className="name">Ушаков Игорь</p>
                        <p className="special">Программист</p>
                    </div>
                    <button className="button-media"><img src="github-logo 1.svg" alt="GitHub"/></button>
                </div>
            </article>
            <article className="comand">
                <h1 className="nazvanye">
                    <span className="name-comand">Команда</span>
                    <span className="name-comand-blue">HuntTeam</span>
                </h1>
                <h2 className="comand-text">Наш искусственный интеллект и другие проекты нашей ЭКО-системы, например крупная платформа WebHunt, — это труд двух разработчиков. Оценить наши проекты и написать в соцсетях можно по ссылкам, указанным на этой странице.</h2>
            </article>
            <article className="sektor">
                <div className="social-media">
                    <button className="button-media"><img src="TenChat.svg" alt="TenChat" /></button>
                    <button className="button-media"><img src="VK.svg" alt="VK" /></button>
                    <button className="button-media"><img src="Telegram.svg" alt="Telegram" /></button>
                </div>
                <img src="ЯрикФото.png" alt="Ярослав" className="photo-sektor" />
                <div className="social-media">
                    <button className="button-media"><img src="DProfile.svg" alt="DProfile" /></button>
                    <div className="Name-text">
                        <p className="name">Ушаков Ярослав</p>
                        <p className="special">Дизайнер</p>
                    </div>
                    <button className="button-media"><img src="behance-163 1.svg" alt="Behance" /></button>
                </div>
            </article>
        </div>    
        <Footer />
        </>
}