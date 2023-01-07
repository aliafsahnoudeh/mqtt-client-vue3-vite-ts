<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useMqttClientStore } from "../store/mqttClient";
import type { QoS } from "mqtt";
import { useMqttClient } from "../composables/useMqttClient";

const OoSOptions = ["0", "1", "2"];

const topic: Ref<string> = ref("");
const qos: Ref<QoS> = ref(0);
const message: Ref<string> = ref("");

const store = useMqttClientStore();
const { publish } = useMqttClient();

async function handlePublish() {
  await publish(topic.value, message.value, qos.value);
  message.value = "";
}
</script>

<template>
  <Card>
    <template #header> Publish a message </template>
    <template #content>
      <div class="content-container">
        <div class="content-container-topic">
          <span class="p-float-label">
            <InputText id="topic" type="text" v-model="topic" />
            <label for="topic">Topic</label>
          </span>
          <span class="p-float-label">
            <Dropdown
              id="qos"
              v-model="qos"
              :options="OoSOptions"
              placeholder="Quality of Service (QoS)"
            />
            <label for="qos">QoS</label>
          </span>
        </div>

        <span class="p-float-label">
          <Textarea v-model="message" rows="5" cols="30" />
          <label for="message">Message body</label>
        </span>
      </div>
    </template>
    <template #footer>
      <Button
        :disabled="
          !store.connected || topic.length === 0 || message.length === 0
        "
        @click="handlePublish"
        icon="pi"
        label="Publish"
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

  &-topic {
    display: flex;
    column-gap: 2vw;
  }
}
</style>
