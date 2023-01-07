<script setup lang="ts">
import type IServices from "../services/IServices";
import type IMqttService from "../services/IMqttService";
import { inject, ref } from "vue";
import type { Ref } from "vue";
import { useMqttClient } from "../store/mqttClient";

const services = inject<IServices | null>("services");
let mqttService: IMqttService;
if (services !== undefined && services !== null)
  mqttService = services.mqttService;

const hostname: Ref<string> = ref(
  "21c9dfead6da4092a72c0da98562c2b5.s2.eu.hivemq.cloud"
);
const username: Ref<string> = ref("ali-test");
const password: Ref<string> = ref("FkNYnhLFmrTUj6_");

const store = useMqttClient();

async function connect() {
  try {
    await mqttService.connect(hostname.value, username.value, password.value);
    store.setConnected(true);
  } catch (error) {
    store.setConnected(false);
  }
}

async function disconnect() {
  try {
    await mqttService.disconnect();
    store.setConnected(false);
  } catch (error) {
    store.setConnected(true);
  }
}
</script>

<template>
  <Card>
    <template #header>
      <Avatar icon="pi pi-user" size="xlarge" />
    </template>
    <template #content>
      <div class="content-container">
        <span class="p-float-label">
          <InputText id="hostname" type="text" v-model="hostname" />
          <label for="hostname">Hostname</label>
        </span>
        <div class="content-container-credentials">
          <span class="p-float-label">
            <InputText id="username" type="text" v-model="username" />
            <label for="username">Username</label>
          </span>
          <span class="p-float-label">
            <InputText id="password" type="text" v-model="password" />
            <label for="password">Password</label>
          </span>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        icon="pi pi-check"
        label="Connect"
        :disabled="store.connected"
        @click="connect"
      />
      <Button
        :disabled="!store.connected"
        @click="disconnect"
        icon="pi pi-times"
        label="Disconnect"
        class="p-button-secondary"
        style="margin-left: 0.5em"
      />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  row-gap: 5vh;

  &-credentials {
    display: flex;
    column-gap: 2vw;
  }
}
</style>
