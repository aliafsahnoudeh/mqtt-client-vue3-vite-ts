import type { QoS } from "mqtt";

export type IMessage = {
  body: string;
  topic: string;
  qos: QoS;
};
