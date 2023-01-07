import { inject } from "vue";
import type IServices from "../services/IServices";
import type IMqttService from "../services/IMqttService";
import type {
  IDisconnectPacket,
  IPublishPacket,
  ISubscriptionGrant,
  QoS,
} from "mqtt";
import { useMqttClientStore } from "../store/mqttClient";
import { useToast } from "primevue/usetoast";

export function useMqttClient() {
  const store = useMqttClientStore();
  const toast = useToast();

  const services = inject<IServices | null>("services");
  let mqttService: IMqttService;
  if (services !== undefined && services !== null)
    mqttService = services.mqttService;

  const connect = async (
    hostname: string,
    username: string,
    password: string
  ) => {
    try {
      await mqttService?.connect(hostname, username, password);

      store.setConnected(true);

      toast.add({
        severity: "success",
        summary: "Conneted",
        detail: "Successfully Conneted",
        life: 3000,
      });

      attachListeners();
    } catch (error: any) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    }
  };

  const disconnect = async () => {
    await mqttService?.disconnect();
    store.setConnected(false);

    toast.add({
      severity: "warn",
      summary: "Disconneted",
      detail: "Successfully Disconneted",
      life: 3000,
    });
  };

  const subscribe = async (topic: string) => {
    const result = await mqttService.subscribe(topic);
    result.forEach((item) => {
      store.addToSubscribedTopics(item);
      toast.add({
        severity: "success",
        summary: "Subscribed",
        detail: `Successfully subscribed to ${item}`,
        life: 3000,
      });
    });
  };

  const publish = async (topic: string, message: string, qos: QoS) => {
    await mqttService.publish(topic, message, qos);
    toast.add({
      severity: "success",
      summary: "Published",
      detail: `Successfully published`,
      life: 3000,
    });
  };

  function attachListeners() {
    mqttService.attachListeners("disconnect", () => {
      toast.add({
        severity: "error",
        summary: "Disconnected",
        detail: "mqtt was disconnected",
        life: 3000,
      });
      store.clearSubscribedTopics();
    });

    mqttService.attachListeners("end", () => {
      toast.add({
        severity: "warn",
        summary: "Ended",
        detail: "mqtt client was ended",
        life: 3000,
      });
      store.clearSubscribedTopics();
    });

    mqttService.attachListeners("offline", () => {
      toast.add({
        severity: "warn",
        summary: "Offline",
        detail: "mqtt client is offline",
        life: 3000,
      });
    });

    mqttService.attachListeners("error", (error: Error) => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error,
        life: 3000,
      });
    });

    mqttService.attachListeners(
      "message",
      (topic: string, payload: Buffer, packet: IPublishPacket) => {
        store.addMessage({
          body: payload.toString(),
          topic,
          qos: packet.qos,
        });

        toast.add({
          severity: "success",
          summary: "Message Received",
          detail: payload.toString(),
          life: 3000,
        });
      }
    );
  }

  return {
    connect,
    disconnect,
    subscribe,
    publish,
  };
}
