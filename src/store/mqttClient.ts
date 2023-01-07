import { defineStore } from "pinia";
import { ref } from "vue";

export const useMqttClient = defineStore("mqttClient", () => {
  const connected = ref<boolean>(false);

  const setConnected = (payload: boolean) => {
    connected.value = payload;
  };

  return { connected, setConnected };
});
