interface IMqttService {
  connect(hostname: string, username: string, password: string): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(topic: string): void;
  publish(topic: string, message: string): Promise<void>;
}

export default IMqttService;
