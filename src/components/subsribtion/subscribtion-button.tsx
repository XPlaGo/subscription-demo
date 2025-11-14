import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";

import VkVideoIcon from "@/assets/vk_video.png";
import { CheckmarkIcon } from "@/components/icons.tsx";

export default function SubscribtionButton() {
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);
  const [subVk, setSubVk] = useState<boolean>(false);

  const onSubVkClick = () => {
    setSubVk(!subVk);
  };

  return (
    <Popover
      showArrow
      isOpen={isPopoverOpened}
      radius={"lg"}
      onOpenChange={(isOpen: boolean) => {
        setPopoverOpened(isOpen);
        onSubVkClick();
      }}
    >
      <PopoverTrigger>
        <Button
          color={subVk ? "default" : "secondary"}
          startContent={subVk ? <CheckmarkIcon /> : null}
          variant={subVk ? "flat" : "solid"}
          onPress={onSubVkClick}
        >
          {subVk ? "Вы подписаны" : "Подписаться"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div
          className={
            "flex flex-col items-center justify-center pt-2 pb-2 pl-1 pr-1 max-w-70"
          }
        >
          <div
            className={"flex flex-row items-center justify-center m-3 gap-3"}
          >
            <img
              alt={"VK Video Icon"}
              height={32}
              src={VkVideoIcon}
              width={32}
            />
            <p>Подписаться на канал в VK Видео?</p>
          </div>
          <div className={"grid grid-cols-2 items-center gap-2 w-full"}>
            <Button>Нет</Button>
            <Button color={"primary"} variant={"solid"}>
              Подписаться
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
