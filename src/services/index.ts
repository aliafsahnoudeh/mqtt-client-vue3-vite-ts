import IocContainer from "../IocContainer";
import MqttService from "./MqttService";

const iocContainer = new IocContainer();

iocContainer.service("MqttService", () => new MqttService());

export const container = iocContainer;

export default {
  mqttService: iocContainer.get("MqttService"),
};
