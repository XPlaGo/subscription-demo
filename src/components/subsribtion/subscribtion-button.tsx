import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { motion } from "framer-motion";

import { VkLogo, VkVideoLogo } from "@/components/logos.tsx";
import { CheckmarkIcon, CloseIcon, GoToIcon } from "@/components/icons.tsx";

export enum VkMode {
  VkVideo = 0,
  Vk = 1,
}

export function SubscribtionButton(props: {
  accountName: string;
  secondaryAccountLink: string;
  vkMode: VkMode;
  isMainSubscribed: boolean;
  setIsMainSubscribed: (isMainSubscribed: boolean) => void;
  isSecondarySubscribed: boolean;
  setIsSecondarySubscribed: (isSecondarySubscribed: boolean) => void;
}) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [isMainSubscribeLoading, setIsMainSubscribeLoading] =
    useState<boolean>(false);

  const onMainSubscribed = () => {
    props.setIsMainSubscribed(true);
  };

  const onMainUnsubscribed = () => {
    props.setIsMainSubscribed(false);
  };

  const goToAccount = () => {
    window.open(props.secondaryAccountLink, "_blank", "noopener,noreferrer");
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
              "flex flex-col items-center justify-center pt-2 pb-2 pl-1 pr-1 w-80"
            }
          >
            <motion.div
              layout
              className={
                "grid grid-cols-3 items-center justify-center m-3 gap-3 w-full"
              }
              style={{ gridTemplateColumns: "auto 1fr auto" }}
            >
              <SecondaryLogo vkMode={props.vkMode} />
              <motion.div key={"subscribeLabel"} layout>
                <SubscribePopoverLabel
                  accountName={props.accountName}
                  vkMode={props.vkMode}
                />
              </motion.div>
              <Button
                isIconOnly
                radius={"full"}
                size={"sm"}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  padding: 0,
                  height: 24,
                  width: 24,
                  minWidth: 24,
                  boxSizing: "content-box",
                }}
                onPress={() => setOpened(false)}
              >
                <CloseIcon height={10} width={10} />
              </Button>
            </motion.div>
            <motion.div
              key={"subscribeAction"}
              layout
              style={{
                width: "100%",
              }}
            >
              <SubscribePopoverActions
                vkMode={props.vkMode}
                onGoto={goToAccount}
                onSecondarySubscribed={() => {
                  props.setIsSecondarySubscribed(true);
                  setOpened(false);
                }}
                onSecondaryUnsubscribed={() => {
                  props.setIsSecondarySubscribed(false);
                }}
              />
            </motion.div>
          </motion.div>
        </PopoverContent>
      </Popover>
      <div
        className={"grid grid-cols-2 gap-3 items-center justify-center"}
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <MainLogo vkMode={props.vkMode} />
        {props.isMainSubscribed ? (
          <Button
            className={"w-40 font-medium"}
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
            className={"w-40 font-medium"}
            color={"secondary"}
            isLoading={isMainSubscribeLoading}
            variant={"solid"}
            onPress={() => {
              setIsMainSubscribeLoading(true);
              setTimeout(() => {
                setIsMainSubscribeLoading(false);
                onMainSubscribed();
                setOpened(true);
              }, 1000);
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
      return <p>Подписаться на сообщество автора в VK?</p>;
    case VkMode.Vk:
      return <p>Рекомендовать канал автора в VK Видео?</p>;
  }
}

function SubscribePopoverActions(props: {
  vkMode: VkMode;
  onSecondarySubscribed: () => void;
  onSecondaryUnsubscribed: () => void;
  onGoto: () => void;
}) {
  const [isSecondarySubscribeLoading, setIsSecondarySubscribeLoading] =
    useState<boolean>(false);

  function getGoToLabel() {
    switch (props.vkMode) {
      case VkMode.VkVideo:
        return "Сообщество";
      case VkMode.Vk:
        return "Канал автора";
    }
  }

  function getSubscribeLabel() {
    switch (props.vkMode) {
      case VkMode.VkVideo:
        return "Подписаться";
      case VkMode.Vk:
        return "Рекомендовать";
    }
  }

  return (
    <motion.div layout className={"grid grid-cols-2 items-center gap-2 w-full"}>
      <Button
        className={"font-medium"}
        endContent={<GoToIcon height={20} width={20} />}
        onPress={props.onGoto}
      >
        {getGoToLabel()}
      </Button>
      <Button
        className={"font-medium"}
        color={"primary"}
        isLoading={isSecondarySubscribeLoading}
        variant={"solid"}
        onPress={() => {
          setIsSecondarySubscribeLoading(true);
          props.onSecondaryUnsubscribed();
          setTimeout(() => {
            setIsSecondarySubscribeLoading(false);
            props.onSecondarySubscribed();
          }, 1000);
        }}
      >
        {getSubscribeLabel()}
      </Button>
    </motion.div>
  );
}

function MainLogo(props: { vkMode: VkMode }) {
  switch (props.vkMode) {
    case VkMode.VkVideo:
      return <VkVideoLogo height={40} width={40} />;
    case VkMode.Vk:
      return <VkLogo height={40} width={40} />;
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
