import * as mqtt from "mqtt/dist/mqtt.min.js";
import type {
  IClientOptions,
  IDisconnectPacket,
  IPublishPacket,
  ISubscriptionGrant,
  MqttClient,
  Packet,
  QoS,
} from "mqtt";
import type IMqttService from "./IMqttService";

class MqttService implements IMqttService {
  private _client: MqttClient | undefined;

  public async connect(
    hostname: string,
    username: string,
    password: string
  ): Promise<void> {
    return new Promise((resove, reject) => {
      try {
        this._client = mqtt.connect({
          clientId: "web-client-" + Math.floor(Math.random() * 1000000000),
          hostname,
          username,
          password,
          protocol: "wss",
          protocolVersion: 4,
          port: 8884,
          path: "/mqtt",
          clean: true,
          resubscribe: true,
          keepalive: 60,
          reconnectPeriod: 5,
        } as IClientOptions);

        this._client?.on("connect", () => {
          resove();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client?.end(true, {}, (error?: Error) => {
        if (error) reject();
        resolve();
      });
    });
  }

  public subscribe(topic: string): Promise<ISubscriptionGrant[]> {
    return new Promise((resolve, reject) => {
      try {
        this._client?.subscribe(
          topic,
          (error: Error, granted: ISubscriptionGrant[]) => {
            if (error) reject(error);
            resolve(granted);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public publish(
    topic: string,
    message: string,
    qos: QoS
  ): Promise<Packet | undefined> {
    return new Promise((resolve, reject) => {
      if (this._client === undefined) throw new Error("client is undefined");

      this._client.publish(
        topic,
        message,
        { qos },
        (error?: Error, packet?: Packet) => {
          if (error) reject(error);
          resolve(packet);
        }
      );
    });
  }

  public attachListeners(event: string, callback: any) {
    this._client?.on(event, callback);
  }
}

export default MqttService;
