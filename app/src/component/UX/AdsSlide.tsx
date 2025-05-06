import { useEffect } from "react";


const YandexAdBlock = ({ blockId }: { blockId: string }) => {
  useEffect(() => {
    const renderAd = () => {
      if (window.Ya?.Context?.AdvManager) {
        try {
          window.Ya.Context.AdvManager.render({
            blockId: blockId,
            renderTo: `yandex_rtb_${blockId}`,
            type: "",
          });
        } catch (error) {
          console.error("Yandex ad rendering error:", error);
        }
      }
    };

    if (window.yaContextCb) {
      window.yaContextCb.push(renderAd);
    } else {
      renderAd();
    }

    return () => {
      const adContainer = document.getElementById(`yandex_rtb_${blockId}`);
      if (adContainer) {
        adContainer.innerHTML = "";
      }
    };
  }, [blockId]);

  return <div id={`yandex_rtb_${blockId}`} />;
};

export default YandexAdBlock;
