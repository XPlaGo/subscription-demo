import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { VkLogo, VkVideoLogo } from "@/components/logos.tsx";
import { CheckmarkIcon, GoToIcon } from "@/components/icons.tsx";

export enum VkMode {
  VkVideo = 0,
  Vk = 1,
}

export function SubscribtionButton(props: {
  accountName: string;
  vkMode: VkMode;
  isMainSubscribed: boolean;
  setIsMainSubscribed: (isMainSubscribed: boolean) => void;
  isSecondarySubscribed: boolean;
  setIsSecondarySubscribed: (isSecondarySubscribed: boolean) => void;
}) {
  const [isOpened, setOpened] = useState<boolean>(false);

  const onMainSubscribed = () => {
    props.setIsMainSubscribed(true);
  };

  const onMainUnsubscribed = () => {
    props.setIsMainSubscribed(false);
  };

  const goToAccount = () => {
    switch (props.vkMode) {
      case VkMode.VkVideo:
        window.open("https://vk.ru", "_blank", "noopener,noreferrer");
        break;
      case VkMode.Vk:
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
          <motion.div
            layout
            className={
              "flex flex-col items-center justify-center pt-2 pb-2 pl-1 pr-1 max-w-70"
            }
          >
            <motion.div
              layout
              className={
                "grid grid-cols-2 items-center justify-center m-3 gap-3"
              }
              style={{ gridTemplateColumns: "auto 1fr" }}
            >
              <SecondaryLogo vkMode={props.vkMode} />
              <AnimatePresence mode={"popLayout"}>
                {props.isSecondarySubscribed ? (
                  <motion.div
                    key={"gotoLabel"}
                    layout
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { ease: "easeInOut" },
                    }}
                    className={"w-full"}
                    initial={{ x: 100, opacity: 0 }}
                  >
                    <GoToPopoverLabel
                      accountName={props.accountName}
                      vkMode={props.vkMode}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={"subscribeLabel"}
                    layout
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { ease: "easeInOut" },
                    }}
                    exit={{ x: -100, opacity: 0 }}
                  >
                    <SubscribePopoverLabel
                      accountName={props.accountName}
                      vkMode={props.vkMode}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence mode={"popLayout"}>
              {props.isSecondarySubscribed ? (
                <motion.div
                  key={"gotoAction"}
                  layout
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { ease: "easeInOut" },
                  }}
                  initial={{ x: 100, opacity: 0 }}
                  style={{
                    width: "100%",
                  }}
                >
                  <GoToPopoverActions goToVkVideo={goToAccount} />
                </motion.div>
              ) : (
                <motion.div
                  key={"subscribeAction"}
                  layout
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { ease: "easeInOut" },
                  }}
                  exit={{ x: -100, opacity: 0 }}
                  style={{
                    width: "100%",
                  }}
                >
                  <SubscribePopoverActions
                    onCancel={() => {
                      setOpened(false);
                    }}
                    onSecondarySubscribed={() =>
                      props.setIsSecondarySubscribed(true)
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </PopoverContent>
      </Popover>
      <div
        className={"grid grid-cols-2 gap-5 items-center justify-center"}
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <MainLogo vkMode={props.vkMode} />
        {props.isMainSubscribed ? (
          <Button
            className={"w-40"}
            color={"default"}
            startContent={<CheckmarkIcon height={20} width={20} />}
            variant={"flat"}
            onPress={() => {
              onMainUnsubscribed();
              setOpened(false);
            }}
          >
            Вы подписаны
          </Button>
        ) : (
          <Button
            className={"w-40"}
            color={"secondary"}
            variant={"solid"}
            onPress={() => {
              onMainSubscribed();
              setOpened(true);
            }}
          >
            Подписаться
          </Button>
        )}
      </div>
    </div>
  );
}

function SubscribePopoverLabel(props: { accountName: string; vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.VkVideo:
      return (
        <p>
          Подписаться на <AccountLabel accountName={props.accountName} /> в VK?
        </p>
      );
    case VkMode.Vk:
      return (
        <p>
          Подписаться на <AccountLabel accountName={props.accountName} /> в VK
          Видео?
        </p>
      );
  }
}

function SubscribePopoverActions(props: {
  onSecondarySubscribed: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div layout className={"grid grid-cols-2 items-center gap-2 w-full"}>
      <Button onPress={props.onCancel}>Нет</Button>
      <Button
        color={"primary"}
        variant={"solid"}
        onPress={props.onSecondarySubscribed}
      >
        Подписаться
      </Button>
    </motion.div>
  );
}
function GoToPopoverLabel(props: { accountName: string; vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.VkVideo:
      return (
        <p>
          Показать аккаунт <AccountLabel accountName={props.accountName} /> в
          VK?
        </p>
      );
    case VkMode.Vk:
      return (
        <p>
          Показать аккаунт <AccountLabel accountName={props.accountName} /> в VK
          Видео?
        </p>
      );
  }
}

function GoToPopoverActions(props: { goToVkVideo: () => void }) {
  return (
    <motion.div layout className={"grid grid-cols-1 items-center gap-2 w-full"}>
      <Button
        color={"secondary"}
        endContent={<GoToIcon height={20} width={20} />}
        variant={"solid"}
        onPress={props.goToVkVideo}
      >
        Перейти
      </Button>
    </motion.div>
  );
}
function AccountLabel(props: { accountName: string }) {
  return <span className={"font-bold text-nowrap"}>{props.accountName}</span>;
}

function MainLogo(props: { vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.VkVideo:
      return <VkVideoLogo height={32} width={32} />;
    case VkMode.Vk:
      return <VkLogo height={32} width={32} />;
  }
}

function SecondaryLogo(props: { vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.VkVideo:
      return <VkLogo height={32} width={32} />;
    case VkMode.Vk:
      return <VkVideoLogo height={32} width={32} />;
  }
}
