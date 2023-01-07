import * as mqtt from "mqtt/dist/mqtt.min.js";
import type { IClientOptions, MqttClient, Packet } from "mqtt";
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
          clientId: "clientId-sqt8rMcmA6",
          hostname,
          username,
          password,
          protocol: "wss",
          protocolVersion: 4,
          port: 8884,
          path: "/mqtt",
          clean: true,
          resubscribe: false,
          keepalive: 60,
          reconnectPeriod: 0,
        } as IClientOptions);

        this._client.on("connect", function () {
          console.log("Connected");
          resove();
        });

        this._client.on("error", function (error: any) {
          console.log(error);
        });

        this._client.on("message", function (topic: any, message: any) {
          // called each time a message is received
          console.log("Received message:", topic, message.toString());
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client.end(true, {}, (error?: Error) => {
        if (error) reject();
        resolve();
      });
    });
  }

  public subscribe(topic: string) {
    this._client.subscribe(topic);
  }

  public publish(topic: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client.publish(
        topic,
        message,
        {},
        (error?: Error, packet?: Packet) => {
          if (error) reject();
          resolve();
        }
      );
    });
  }
}

export default MqttService;
