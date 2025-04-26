import { useEffect } from "react";

declare global {
  interface Window {
    yaContextCb?: Array<() => void>;
    Ya?: {
      Context: {
        AdvManager: {
          render: (options: {
            blockId: string;
            renderTo: string;
            type: string;
          }) => void;
        };
      };
    };
  }
}

const YandexAd = ({ blockID }: { blockID: string }) => {
  useEffect(() => {
    if (window.yaContextCb) {
      window.yaContextCb.push(() => {
        window.Ya?.Context.AdvManager.render({
          blockId: blockID,
          renderTo: `yandex_rtb_${blockID}`,
          type: "feed",
        });
      });
    }
  }, []);

  return <div id={`yandex_rtb_${blockID}`} />;
};

export default YandexAd;
