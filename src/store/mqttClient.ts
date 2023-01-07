import type { IMessage } from "@/types/IMessage";
import type { ISubscriptionGrant } from "mqtt";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useMqttClientStore = defineStore("mqttClient", () => {
  const connected = ref<boolean>(false);
  const receivedMessages = reactive<IMessage[]>([]);
  const subscribedTopics: ISubscriptionGrant[] = reactive([]);

  const setConnected = (payload: boolean) => {
    connected.value = payload;
  };

  function addMessage(message: IMessage) {
    receivedMessages.unshift(message);
  }

  function addToSubscribedTopics(topic: ISubscriptionGrant) {
    subscribedTopics.unshift(topic);
  }

  function clearSubscribedTopics() {
    subscribedTopics.splice(0, subscribedTopics.length);
  }

  return {
    connected,
    setConnected,
    receivedMessages,
    addMessage,
    subscribedTopics,
    addToSubscribedTopics,
    clearSubscribedTopics,
  };
});
