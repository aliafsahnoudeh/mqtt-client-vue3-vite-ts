import type { ISubscriptionGrant, Packet, QoS } from "mqtt";

interface IMqttService {
  connect(hostname: string, username: string, password: string): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(topic: string): Promise<ISubscriptionGrant[]>;
  publish(
    topic: string,
    message: string,
    qos: QoS
  ): Promise<Packet | undefined>;
  attachListeners(event: string, callback: any): void;
}

export default IMqttService;
