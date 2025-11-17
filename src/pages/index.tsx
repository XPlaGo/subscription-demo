import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import {
  SubscribtionButton,
  VkMode,
} from "@/components/subsribtion/subscribtion-button.tsx";

export default function IndexPage() {
  const [isVkSubscribed, setIsVkSubscribed] = useState(false);
  const [isVkVideoSubscribed, setIsVkVideoSubscribed] = useState(false);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
        <div className="grid grid-rows-2 justify-center items-stretch gap-20 h-full">
          <SubscribtionButton
            accountName={"Subscribtion 1.0"}
            isMainSubscribed={isVkSubscribed}
            isSecondarySubscribed={isVkVideoSubscribed}
            secondaryAccountLink={"https://vkvideo.ru/@vkeducation"}
            setIsMainSubscribed={setIsVkSubscribed}
            setIsSecondarySubscribed={setIsVkVideoSubscribed}
            vkMode={VkMode.Vk}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
