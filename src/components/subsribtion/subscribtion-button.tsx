import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";

import { VkLogo, VkVideoLogo } from "@/components/logos.tsx";
import { CheckmarkIcon, GoToIcon } from "@/components/icons.tsx";

export enum VkMode {
  Vk = 0,
  VkVideo = 1,
}

export default function SubscribtionButton(props: {
  accountName: string;
  vkMode: VkMode;
}) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [isVkSubscribed, setIsVkSubscribed] = useState<boolean>(false);
  const [isVkVideoSubscribed, setIsVkVideoSubscribed] =
    useState<boolean>(false);

  const onVkSubscribe = () => {
    setIsVkSubscribed(true);
    setIsVkVideoSubscribed(false);
  };

  const onVkUnsubscribe = () => {
    setIsVkSubscribed(false);
    setIsVkVideoSubscribed(false);
  };

  const goToAccount = () => {
    switch (props.vkMode) {
      case VkMode.Vk:
        window.open("https://vk.ru", "_blank", "noopener,noreferrer");
        break;
      case VkMode.VkVideo:
        window.open("https://vkvideo.ru", "_blank", "noopener,noreferrer");
        break;
    }
  };

  return (
    <div className={"flex flex-col w-auto h-auto justify-center items-center"}>
      <Popover
        showArrow
        isOpen={isOpened}
        radius={"lg"}
        onClose={() => setOpened(false)}
      >
        <PopoverTrigger>
          <div />
        </PopoverTrigger>
        <PopoverContent>
          {isVkVideoSubscribed ? (
            <GoToVkVideoPopoverContent
              accountName={props.accountName}
              goToVkVideo={goToAccount}
              vkMode={props.vkMode}
            />
          ) : (
            <VkVideoSubscribePopoverContent
              accountName={props.accountName}
              vkMode={props.vkMode}
              onCancel={() => setOpened(false)}
              onVkVideoSubscribe={() => setIsVkVideoSubscribed(true)}
            />
          )}
        </PopoverContent>
      </Popover>
      {isVkSubscribed ? (
        <Button
          color={"default"}
          startContent={<CheckmarkIcon height={20} width={20} />}
          variant={"flat"}
          className={"w-40"}
          onPress={() => {
            onVkUnsubscribe();
            setOpened(false);
          }}
        >
          Вы подписаны
        </Button>
      ) : (
        <Button
          color={"secondary"}
          variant={"solid"}
          className={"w-40"}
          onPress={() => {
            onVkSubscribe();
            setOpened(true);
          }}
        >
          Подписаться
        </Button>
      )}
    </div>
  );
}

function VkVideoSubscribePopoverContent(props: {
  onVkVideoSubscribe: () => void;
  onCancel: () => void;
  accountName: string;
  vkMode: VkMode;
}) {
  const getLabel = () => {
    switch (props.vkMode) {
      case VkMode.Vk:
        return (
          <p>
            Подписаться на <AccountLabel accountName={props.accountName} /> в
            VK?
          </p>
        );
      case VkMode.VkVideo:
        return (
          <p>
            Подписаться на <AccountLabel accountName={props.accountName} /> в VK
            Видео?
          </p>
        );
    }
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-center pt-2 pb-2 pl-1 pr-1 max-w-70"
      }
    >
      <div className={"flex flex-row items-center justify-center m-3 gap-3"}>
        <Logo vkMode={props.vkMode} />
        {getLabel()}
      </div>
      <div className={"grid grid-cols-2 items-center gap-2 w-full"}>
        <Button onPress={props.onCancel}>Нет</Button>
        <Button
          color={"primary"}
          variant={"solid"}
          onPress={props.onVkVideoSubscribe}
        >
          Подписаться
        </Button>
      </div>
    </div>
  );
}

function GoToVkVideoPopoverContent(props: {
  goToVkVideo: () => void;
  accountName: string;
  vkMode: VkMode;
}) {
  const getLabel = () => {
    switch (props.vkMode) {
      case VkMode.Vk:
        return (
          <p>
            Показать аккаунт <AccountLabel accountName={props.accountName} /> в
            VK?
          </p>
        );
      case VkMode.VkVideo:
        return (
          <p>
            Показать аккаунт <AccountLabel accountName={props.accountName} /> в
            VK Видео?
          </p>
        );
    }
  };

  return (
    <div
      className={
        "flex flex-col items-center justify-center pt-2 pb-2 pl-1 pr-1 max-w-70"
      }
    >
      <div className={"flex flex-row items-center justify-center m-3 gap-3"}>
        <Logo vkMode={props.vkMode} />
        {getLabel()}
      </div>
      <div className={"grid grid-cols-1 items-center gap-2 w-full"}>
        <Button
          color={"secondary"}
          endContent={<GoToIcon height={20} width={20} />}
          variant={"solid"}
          onPress={props.goToVkVideo}
        >
          Перейти
        </Button>
      </div>
    </div>
  );
}

function AccountLabel(props: { accountName: string }) {
  return <span className={"font-bold text-nowrap"}>{props.accountName}</span>;
}

function Logo(props: { vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.Vk:
      return <VkLogo height={32} width={32} />;
    case VkMode.VkVideo:
      return <VkVideoLogo height={32} width={32} />;
  }
}
