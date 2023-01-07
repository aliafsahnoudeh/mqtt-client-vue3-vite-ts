import type { ISubscriptionGrant, Packet } from "mqtt";

interface IMqttService {
  connect(hostname: string, username: string, password: string): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(topic: string): Promise<ISubscriptionGrant[]>;
  publish(topic: string, message: string): Promise<Packet>;
}

export default IMqttService;
