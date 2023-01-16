<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useMqttClientStore } from "../store/mqttClient";
import { useMqttClient } from "../composables/useMqttClient";

const hostname: Ref<string> = ref("");
const username: Ref<string> = ref("");
const password: Ref<string> = ref("");

const store = useMqttClientStore();
const { connect, disconnect } = useMqttClient();

async function handleConnect() {
  await connect(hostname.value, username.value, password.value);
}

async function handleDisonnect() {
  await disconnect();
}
</script>

<template>
  <Card>
    <template #header> Connection </template>
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
        icon="pi"
        label="Connect"
        :disabled="store.connected"
        @click="handleConnect"
      />
      <Button
        :disabled="!store.connected"
        @click="handleDisonnect"
        icon="pi"
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
