import { useEffect, useState } from "react";

const YandexAdBlock = ({
  blockId,
  defaultMaxWidth = "300px",
  defaultMaxHeight = "600px",
  mobileMaxWidth = "250px",
  mobileMaxHeight = "400px",
}: {
  blockId: string;
  defaultMaxWidth?: string;
  defaultMaxHeight?: string;
  mobileMaxWidth?: string;
  mobileMaxHeight?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство по ширине экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 900px)").matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Выбираем размеры в зависимости от устройства
  const maxHeight = isMobile ? mobileMaxHeight : defaultMaxHeight;
  const maxWidth = isMobile ? mobileMaxWidth : defaultMaxWidth;

  useEffect(() => {
    const renderAd = () => {
      if (window.Ya?.Context?.AdvManager) {
        try {
          window.Ya.Context.AdvManager.render({
            blockId,
            renderTo: `yandex_rtb_${blockId}`,
            type: "",
          });
        } catch (error) {
          setIsLoading(true);
          console.error("Yandex ad rendering error:", error);
        }
      }
    };

    if (window.yaContextCb) {
      window.yaContextCb.push(renderAd);
    } else {
      renderAd();
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          try {
            setIsLoading(false);
            observer.disconnect();
            break;
          } catch (e) {
            console.log(e, " тут ошибка");
          }
        }
      }
    });

    const adContainer = document.getElementById(`yandex_rtb_${blockId}`);
    if (adContainer) {
      observer.observe(adContainer, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (adContainer) {
        adContainer.innerHTML = "";
      }
    };
  }, [blockId]);

  return (
    <div
      style={{
        position: "relative",
        maxWidth,
        maxHeight,
        width: "100%",
        height: "100%",
      }}
    >
      {isLoading && (
        <img
          alt="Реклама"
          src="/placeholder.png"
          style={{
            backgroundColor: "#e0e0e0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      <div
        id={`yandex_rtb_${blockId}`}
        style={{
          maxWidth,
          maxHeight,
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default YandexAdBlock;