import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import {
  SubscribtionButton,
  VkMode,
} from "@/components/subsribtion/subscribtion-button.tsx";
import { VkLogo, VkVideoLogo } from "@/components/logos.tsx";

export default function IndexPage() {
  const [isVkSubscribed, setIsVkSubscribed] = useState(false);
  const [isVkVideoSubscribed, setIsVkVideoSubscribed] = useState(false);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
        <div className="grid grid-rows-2 justify-center items-stretch gap-20 h-full w-100">
          <div
            className={
              "grid grid-cols-2 items-center justify-center gap-5 w-full"
            }
            style={{ gridTemplateColumns: "32px auto" }}
          >
            <VkVideoLogo height={32} width={32} />
            <SubscribtionButton
              accountName={"Subscribtion 1.0"}
              isMainSubscribed={isVkVideoSubscribed}
              isSecondarySubscribed={isVkSubscribed}
              setIsMainSubscribed={setIsVkVideoSubscribed}
              setIsSecondarySubscribed={setIsVkSubscribed}
              vkMode={VkMode.Vk}
            />
          </div>
          <div
            className={
              "grid grid-cols-2 items-center justify-center gap-5 w-full"
            }
            style={{ gridTemplateColumns: "32px auto" }}
          >
            <VkLogo height={32} width={32} />
            <SubscribtionButton
              accountName={"Subscribtion 1.0"}
              isMainSubscribed={isVkSubscribed}
              isSecondarySubscribed={isVkVideoSubscribed}
              setIsMainSubscribed={setIsVkSubscribed}
              setIsSecondarySubscribed={setIsVkVideoSubscribed}
              vkMode={VkMode.VkVideo}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
